import { IAuth } from "~~/types";
export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    const body = await readBody(event);

    if (!body.user) throw "Không tìm thấy ID người dùng";

    const user = await DB.User.findById(body.user);

    if (!user) throw "Người dùng không tồn tại";
    if (user.kyc.status == 0) throw "Người dùng chưa gửi KYC";
    if (user.kyc.status == 2) throw "Người dùng đã xác thực KYC";

    user.kyc.status = 2;
    user.kyc.rejectReason = "";
    await user.save();
    !!IO && IO.to(`user_${user._id.toString()}`).emit("user-approve", { status: user.kyc.status});
    return resp(event, { message: "Duyệt thành công" });
  } catch (error: any) {
    return resp(event, { code: 400, message: error.toString() });
  }
});
