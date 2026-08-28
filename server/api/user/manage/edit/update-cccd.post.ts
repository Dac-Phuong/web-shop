import { IAuth, IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    const { user: userId, front, back } = await readBody(event);

    if (!userId) throw "Dữ liệu đầu vào không hợp lệ";

    const user = (await DB.User.findOne({ _id: userId }).select(
      "username type kyc",
    )) as IDBUser;

    if (!user) throw "Người dùng không tồn tại";

    const update: any = {};
    const change = [];

    if (front) {
      update["kyc.frontImage"] = front;
      change.push("ảnh mặt trước CCCD");
    }

    if (back) {
      update["kyc.backImage"] = back;
      change.push("ảnh mặt sau CCCD");
    }

    if (change.length === 0) {
      throw "Không có ảnh nào cần cập nhật";
    }

    const updatedUser = (await DB.User.findOneAndUpdate(
      { _id: userId },
      {
        $set: update,
      },
      {
        new: true,
      },
    ).select("username type kyc")) as IDBUser;

    if (!updatedUser) throw "Không thể cập nhật thông tin người dùng";

    await logAdmin(event, `Sửa <b>${change.join(", ")}</b> của tài khoản <b>${user.username}</b>`);

    return resp(event, {
      result: updatedUser,
      message: "Cập nhật ảnh CCCD thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
    });
  }
});
