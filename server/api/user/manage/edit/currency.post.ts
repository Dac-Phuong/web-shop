export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { id, type, amount } = body;

    // VALIDATE TYPE
    if (!type || !["deposit", "bonus", "subtract"].includes(type))
      throw "Loại giao dịch không hợp lệ";

    // VALIDATE AMOUNT
    const money = Number(amount);
    if (!money || money <= 0) throw "Số tiền không hợp lệ";

    // FIND USER
    const user = await DB.User.findById(id);
    if (!user) throw "Không tìm thấy người dùng";

    // CURRENT BALANCE
    const oldBalance = user.coin || 0;
    let newBalance = oldBalance;

    // HANDLE ADD / SUBTRACT
    if (type === "subtract") {
      if (oldBalance < money) throw "Số dư không đủ";
      newBalance = oldBalance - money;
    } else {
      newBalance = oldBalance + money;
    }

    // UPDATE BALANCE
    user.coin = newBalance;
    await user.save();

    // NOTE
    const noteMap: Record<string, string> = {
      deposit: "admin.deposit",
      bonus: "admin.bonus",
      subtract: "admin.subtract",
    };

    // TRANSACTION TYPE
    const transactionType = type === "subtract" ? "withdraw" : "deposit";

    // CREATE TRANSACTION
    await DB.Transaction.create({
      user: user._id,
      type: transactionType,
      method: "manual",
      amount: money,
      note: noteMap[type],
      status: "success",
    });
    // gỡ gian hàng đã đóng băng
    if (type !== "subtract") {
      const freeze = await DB.ProductFreeze.findOne({ user: user._id, status: 0 }).populate({ path: "product", select: "price"}).lean();
      if (freeze?.product) {
        const newBalance = Number(user.coin || 0) + Number(money || 0);
        const requiredAmount = Number(freeze.product.price || 0);
        if (newBalance >= requiredAmount) {
          await DB.ProductFreeze.updateOne({_id: freeze._id, status: 0 }, { $set: { status: 1}});
        }
      }
    }
    !!IO && IO.to(`user_${user._id}`).emit("auth-update");
    return resp(event, {
      message:type === "subtract" ? "Trừ tiền thành công" : "Cộng tiền thành công",
    });
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});
