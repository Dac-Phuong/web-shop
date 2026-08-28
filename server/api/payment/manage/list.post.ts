import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    await getAuth(event);

    const body = await readBody(event);

    const page = Number(body.page || 1);
    const limit = Number(body.limit || 10);

    const query: any = {};

    if (body.user) {
      query.user = body.user;
    }

    if (body.type && body.type !== "all") {
      query.type = body.type;
    }

    const [total, list] = await Promise.all([
      DB.Transaction.countDocuments(query),

      DB.Transaction.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    return resp(event, {
      result: {
        items: list,
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});