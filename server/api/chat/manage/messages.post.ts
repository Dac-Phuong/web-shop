import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    if (!auth) {
      throw "Bạn chưa đăng nhập";
    }

    const body = await readBody(event);

    const userId = body.userId;

    if (!userId)  throw "Thiếu userId"; 

    const list = await DB.SocketChat.find({
      $or: [
        {
          sender: auth._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: auth._id,
        },
      ],
    })
      .populate({
        path: "sender",
        select: "username avatar level type",
        populate: {
          path: "level",
          select: "number",
        },
      })
      .populate({
        path: "receiver",
        select: "username avatar level type",
        populate: {
          path: "level",
          select: "number",
        },
      })
      .sort({
        createdAt: 1,
      });

    // read message
    await DB.SocketChat.updateMany(
      {
        sender: userId,
        receiver: auth._id,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

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
