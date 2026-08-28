import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    const body = await readBody(event);

    const current = Number(body.current || 1);
    const limit = Number(body.limit || 10);

    const query: any = {
      user: auth._id,
    };

    if (body.type && body.type !== "all") {
      query.type = String(body.type);
    }

    const [list, total] = await Promise.all([
      DB.Transaction.find(query)
        .sort({ createdAt: -1 })
        .skip((current - 1) * limit)
        .limit(limit)
        .lean(),

      DB.Transaction.countDocuments(query),
    ]);

    return resp(event, {
      result: {
        items: list,
        total,
        current,
        limit,
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
