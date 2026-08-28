import type { Server as SocketServer, Socket } from "socket.io";

export default (io: SocketServer, socket: Socket) => {
  socket.on("chat-send", async (data) => {
    try {
      if (!socket.authID) throw "Chưa đăng nhập";

      const { message = "", receiverId, type = "text", fileUrl } = data;

      const sender = await DB.User.findById(socket.authID);
      if (!sender) throw "Sender không tồn tại";

      let receiver: any;

      if (sender.type !== 3) {
        receiver = await DB.User.findOne({ type: 3 });
      } else {
        if (!receiverId) throw "Thiếu receiverId";

        receiver = await DB.User.findById(receiverId);
      }

      if (!receiver) throw "Receiver không tồn tại";

      const isText = type === "text";
      const isMedia = type === "image" || type === "file";

      if (isText && !message.trim()) throw "Tin nhắn không được rỗng";

      if (isMedia && !fileUrl) throw "Thiếu fileUrl";

      const msg = await DB.SocketChat.create({
        sender: sender._id,
        receiver: receiver._id,
        message: isText ? message : "",
        fileUrl: isMedia ? fileUrl : null,
        type,
        isRead: false,
      });

      const msgData = await DB.SocketChat.findById(msg._id)
        .populate("sender", "username avatar phone type")
        .populate("receiver", "username avatar phone type");

      io.to(`user_${sender._id}`).emit("chat-receive", msgData);
      io.to(`user_${receiver._id}`).emit("chat-receive", msgData);

      if (sender.type !== 3) {
        const previousMessage = await DB.SocketChat.exists({
          sender: sender._id,
          receiver: receiver._id,
          _id: { $ne: msg._id },
        });
        
        if (!previousMessage) {
          const welcomeMsg = await DB.SocketChat.create({
            sender: receiver._id,
            receiver: sender._id,
            message: "Welcome to Graff Diamonds customer service",
            fileUrl: null,
            type: "text",
            isRead: false,
          });

          const welcomeData = await DB.SocketChat.findById(welcomeMsg._id)
            .populate("sender", "username avatar phone type")
            .populate("receiver", "username avatar phone type");

          io.to(`user_${sender._id}`).emit("chat-receive", welcomeData);

          io.to(`user_${receiver._id}`).emit("chat-receive", welcomeData);
        }

        await notifyAdmin({
          type: "chat",
          title: "Tin nhắn mới",
          content: `${sender.phone} vừa gửi 1 tin nhắn mới`,
        });
      }

    } catch (err: any) {
      socket.emit("chat-error", {
        message: err?.message || err || "Send fail",
      });
    }
  });
};
