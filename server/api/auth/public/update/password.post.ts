import md5 from "md5";
import { IAuth, IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    const { currentPassword, password, confirmPassword } = await readBody(event);
    if (!currentPassword || !password || !confirmPassword) throw "Vui lòng nhập đầy đủ thông tin";
    if (password.length < 6 || password.length > 15) throw "Mật khẩu trong khoảng 6-15 ký tự";
    if (/\s/.test(password)) throw "Mật khẩu không có khoảng cách";
    if (password !== confirmPassword) throw "Mật khẩu xác nhận không khớp";
    if (currentPassword === password) throw "Mật khẩu mới không được trùng với mật khẩu cũ";

    const user = (await DB.User.findOne({_id: auth._id}).select("password block")) as IDBUser;

    if (!user) throw "Tài khoản không tồn tại";
    if (user.block === 1) throw "Tài khoản đang bị khóa, không thể đổi mật khẩu";

    if (user.password !== md5(currentPassword)) throw "Mật khẩu hiện tại không chính xác";
    user.password = md5(password);

    await user.save();

    return resp(event, {
      message: "Đổi mật khẩu thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e?.toString() || "Có lỗi xảy ra",
    });
  }
});
