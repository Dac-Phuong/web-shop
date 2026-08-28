import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    if (!query.id) throw "Thiếu ID người dùng";

    if (!mongoose.Types.ObjectId.isValid(query.id as string)) {
      throw "ID không hợp lệ";
    }

    const user = await DB.User.findById(query.id).lean();
    if (!user) throw "Người dùng không tồn tại";

    const bankAccount = await DB.BankAccount.find({user: user._id }).sort({ createdAt: -1 }).lean();

    return resp(event, {
      result: {
        ...user,
        bankAccount,
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
    });
  }
});
