import { IAuth } from "~~/types";

type ChatUser = {
  _id: string;
  phone?: string;
  username: string;
  avatar?: string;
  online: boolean;
  unread: number;
  lastMessage: string;
  lastTime: string | Date;
};

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    if (!auth) throw "Bạn chưa đăng nhập";

    const chats = await DB.SocketChat.aggregate([
      {
        $match: {
          $or: [{ sender: auth._id }, { receiver: auth._id }],
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", auth._id] },
              "$receiver",
              "$sender",
            ],
          },

          lastMessage: { $first: "$message" },
          lastTime: { $first: "$createdAt" },

          unread: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiver", auth._id] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const userIds = chats.map((item: any) => item._id);

    const users = await DB.User.find({
      _id: { $in: userIds },
    }).select("username phone avatar");

    const result: ChatUser[] = users.map((user: any) => {
      const chat = chats.find(
        (item: any) =>
          item._id.toString() === user._id.toString()
      );

      return {
        _id: user._id.toString(),
        phone: user.phone,
        username: user.username,
        avatar: user.avatar,
        online: false,
        unread: chat?.unread || 0,
        lastMessage: chat?.lastMessage || "",
        lastTime: chat?.lastTime || new Date(0),
      };
    });

    result.sort((a: ChatUser, b: ChatUser) => {
      return (
        new Date(b.lastTime).getTime() -
        new Date(a.lastTime).getTime()
      );
    });

    return resp(event, {
      result,
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
      result: [],
    });
  }
});