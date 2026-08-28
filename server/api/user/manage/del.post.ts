import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.user) throw "Không tìm thấy ID người dùng";

    const user = await DB.User.findById(body.user);
    if (!user) throw "Người dùng không tồn tại";

    // không cho xóa admin
    if (user.type === 99) throw "Không thể xóa tài khoản admin";

    await DB.User.deleteOne({ _id: body.user});

    return resp(event, {
      message: "Xóa người dùng thành công",
    });
  } catch (error: any) {
    return resp(event, {
      code: 400,
      message: error.toString(),
    });
  }
});