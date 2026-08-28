import type { Server as SocketServer, Socket } from "socket.io";

export default (io: SocketServer, socket: Socket) => {
  socket.on("notification", async () => {
    try {
      const count = await DB.SocketNotify.countDocuments({isRead: false});
      socket.emit("notification", { count});
    } catch {
      return;
    }
  });
};
