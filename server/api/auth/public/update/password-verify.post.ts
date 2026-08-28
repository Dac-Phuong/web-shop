import md5 from "md5";
import { IAuth, IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    const { currentPassword } = await readBody(event);
    if (!currentPassword)  throw "Vui lòng nhập mật khẩu đăng nhập";

    const user = (await DB.User.findOne({ _id: auth._id, }).select("password withdraw block")) as IDBUser ;
    if (!user) throw "Tài khoản không tồn tại";
    if (user.block === 1) throw "Tài khoản đang bị khóa";
    if (user.password !== md5(currentPassword)) throw "Mật khẩu đăng nhập không chính xác";
    if (user.withdraw.status == 0) throw "Bạn chưa thiết lập mật khẩu rút tiền";

    return resp(event, {
      message: "Xác thực thành công",
      result: user.withdraw.password,
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e?.toString() || "Có lỗi xảy ra",
    });
  }
});