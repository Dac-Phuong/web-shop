export default defineEventHandler(async (event) => {
  try {
    const { notifyId = null } = await readBody(event);

    if (notifyId) {
      await DB.SocketNotify.updateOne(
        {
          _id: notifyId,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );
    } else {
      await DB.SocketNotify.updateMany(
        {
          isRead: false,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );
    }

    return resp(event, {});
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});