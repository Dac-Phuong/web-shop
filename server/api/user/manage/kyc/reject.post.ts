import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    if (!auth?._id) throw "Vui lòng đăng nhập";

    const body = await readBody(event);

    if (!body.user) throw "Không tìm thấy ID người dùng";
    if (!body.reason) throw "Vui lòng nhập lý do từ chối";

    const user = await DB.User.findById(body.user);
    if (!user) throw "Người dùng không tồn tại";

    if (user.kyc.status == 0) throw "Người dùng chưa gửi KYC";
    if (user.kyc.status == 3) throw "KYC đã bị từ chối";

    user.kyc.status = 3;
    user.kyc.rejectReason = body.reason;
    await user.save();

    return resp(event, { message: "Đã từ chối KYC" });
  } catch (error: any) {
    return resp(event, {
      code: 400,
      message: error.toString(),
    });
  }
});
