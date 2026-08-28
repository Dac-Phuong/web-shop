export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const page = Number(body.page || 1);
    const limit = Number(body.limit || 20);

    const skip = (page - 1) * limit;

    const [items, total, unread] = await Promise.all([
      DB.SocketNotify.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      DB.SocketNotify.countDocuments({}),

      DB.SocketNotify.countDocuments({
        isRead: false,
      }),
    ]);

    return resp(event, {
      result: {
        items,
        unread,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});
