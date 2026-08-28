import md5 from "md5";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.user) throw "Không tìm thấy người dùng";

    if (!body.newPassword) throw "Vui lòng nhập mật khẩu rút tiền";
    if (body.newPassword.length < 6) throw "Mật khẩu tối thiểu 6 ký tự";

    const user = await DB.User.findById(body.user);
    if (!user) throw "Người dùng không tồn tại";

    user.withdrawPin = md5(body.newPassword);
    await user.save();

    return resp(event, {
      message: "Cập nhật mật khẩu rút tiền thành công",
    });
  } catch (error: any) {
    return resp(event, {
      code: 400,
      message: error.toString(),
    });
  }
});