import { IAuth } from "~~/types";
import md5 from "md5";
import { notifyAdmin } from "~~/server/utils/notifySocket";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    const body = await readBody(event);

    const type = body.type?.trim();
    const amount = Number(body.amount);
    if (!body.withdrawPassword) throw "enterWithdrawalPassword";
    // Payment
    const payment: any = {};
    if (type === "bank") {
      const bankName = body.bankName?.trim();
      const accountNumber = body.accountNumber?.replace(/\s+/g, "").trim();

      const accountName = body.accountName?.trim();
      if (!bankName || bankName.length < 2) throw "invalidBankName";
      if (!/^\d{6,20}$/.test(accountNumber)) throw "invalidAccountNumber";
      if (!accountName || accountName.length < 2) throw "invalidAccountHolderName";

      payment.bank = {
        bankName,
        accountNumber,
        accountName,
      };
    }
    if (type === "usdt") {
      const wallet = body.wallet?.trim();
      const address = body.address?.trim();

      if (!wallet) throw "selectWalletType";
      if (!address || address.length < 8) throw "invalidWalletAddress";

      payment.usdt = {
        wallet,
        address,
      };
    }
    // Validate
    if (!["bank", "usdt"].includes(type)) throw "invalidWithdrawMethod";
    if (!amount) throw "invalidWithdrawAmount";
    if (amount < 100) throw "minimumWithdrawalAmount100";

    // Check pending
    const pendingTransaction = await DB.Transaction.findOne({
      user: auth._id,
      type: "withdraw",
      status: "pending",
    });

    if (pendingTransaction) throw "pendingWithdrawalRequest";
    // Get user
    const user = await DB.User.findById(auth._id);
    if (!user) throw "accountNotFound";
    if(user.kyc.status !== 2) throw "KYCnotYetVerified";
    if ((user.coin || 0) < amount) throw "insufficientBalance";
    if (md5(body.withdrawPassword) !== user.withdrawPin) throw "incorrectWithdrawalPassword";

    // Trừ tiền
    user.coin -= amount;
    await user.save();

    // Tạo giao dịch
    await DB.Transaction.create({
      user: user._id,
      type: "withdraw",
      method: type,
      amount,
      payment,
      note: "requestWithdrawal",
      status: "pending",
    });
    !!IO && IO.to(`user_${user._id}`).emit("auth-update");
    // !!IO && IO.to("admins").emit("user-withdraw");
    await notifyAdmin({
      type: "withdraw",
      title: "Yêu cầu rút tiền",
      content: `${user.phone} vừa gửi yêu cầu rút tiền`,
    });
    return resp(event, {
      message: "withdrawRequestCreated",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e?.message || e.toString(),
    });
  }
});
