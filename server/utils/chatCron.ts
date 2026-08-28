import cron from "node-cron";

export const startChatCron = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const expireTime = new Date(Date.now() - 15 * 60 * 1000);
      const users = await DB.User.find({type: { $ne: 3 }}).select("_id");
      const userIds = users.map((user) => user._id);
      const result = await DB.SocketChat.deleteMany({
        sender: {
          $in: userIds,
        },
        createdAt: {
          $lte: expireTime,
        },
      });

      if (result.deletedCount > 0) {
        console.log(`[CHAT CRON] Deleted ${result.deletedCount} expired messages`,);
      }
    } catch (error) {
      console.error("[CHAT CRON ERROR]", error);
    }
  });
  console.log("[CHAT CRON] Started");
};

export const deleteExpiredChatMessages = async () => {
  const expireTime = new Date(Date.now() - 15 * 60 * 1000);

  const users = await DB.User.find({type: { $ne: 3 }}).select("_id");

  const userIds = users.map((user: any) => user._id);
  const result = await DB.SocketChat.deleteMany({
    sender: {
      $in: userIds,
    },
    createdAt: {
      $lte: expireTime,
    },
  });

  if (result.deletedCount > 0) {
    console.log(`[CHAT CRON] Deleted ${result.deletedCount} messages`);
  }
};
