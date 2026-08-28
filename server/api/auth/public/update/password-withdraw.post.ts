import md5 from "md5";
import { IAuth, IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    const { password, confirmPassword } = await readBody(event);

    if (!password || !confirmPassword) throw "Vui lòng nhập đầy đủ thông tin";
    if (typeof password !== "string") throw "Mật khẩu không hợp lệ";
    if (password.length < 6 || password.length > 15) throw "Mật khẩu trong khoảng 6-15 ký tự";
    if (/\s/.test(password)) throw "Mật khẩu không có khoảng cách";
    if (password !== confirmPassword) throw "Mật khẩu xác nhận không khớp";

    const user = (await DB.User.findOne({_id: auth._id}).select("withdrawPassword block")) as IDBUser;
    if (!user) throw "Tài khoản không tồn tại";
    if (user.block === 1) throw "Tài khoản đang bị khóa, không thể tạo mật khẩu";

    if (user.withdraw.status == 1) throw "Mật khẩu rút tiền đã được thiết lập";
    user.withdraw.status = 1;
    user.withdraw.password = password;
    await user.save();
    !!IO && IO.to(`user_${user._id}`).emit("auth-update");
    return resp(event, {
      message: "Tạo mật khẩu rút tiền thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e?.toString() || "Có lỗi xảy ra",
    });
  }
});
