import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    if (!auth) throw "Bạn chưa đăng nhập";

    const admin = await DB.User.findOne({ type: 3 });

    if (!admin) {
      throw "Admin không tồn tại";
    }

    const list = await DB.SocketChat.find({
      $or: [
        {
          sender: auth._id,
          receiver: admin._id,
        },
        {
          sender: admin._id,
          receiver: auth._id,
        },
      ],
    })
      .populate({
        path: "sender",
        select: "username avatar",
      })
      .populate({
        path: "receiver",
        select: "username avatar",
      })
      .sort({
        createdAt: 1,
      });

    return resp(event, {
      result: list,
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
      result: [],
    });
  }
});
