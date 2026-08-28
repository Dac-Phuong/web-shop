import { IDBUser } from "~~/types";
interface INotifyAdmin {
  type: string;
  title: string;
  content: string;
}
export const notifyAdmin = async (data: INotifyAdmin) => {
  try {
    const user = (await DB.User.findOne({ type: 3 }).select(
      "username type",
    )) as IDBUser;
    if (!user) throw "Không tìm thấy admin";
    const notify = await DB.SocketNotify.create({
      user: user._id,
      type: data.type,
      title: data.title,
      content: data.content,
      isRead: false,
    });

    // const count = await DB.SocketNotify.countDocuments({ isRead: false });
    IO?.to("admins").emit("notify-admin");
    IO?.emit("notification-test", {
      ok: true,
    });
    console.log("EMIT NOTIFICATION");
    console.log(IO?.sockets.adapter.rooms.get("admins"));
    return notify;
  } catch (e) {
    console.log("Notify Admin Error:", e);
  }
};
