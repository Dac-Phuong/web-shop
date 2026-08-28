import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search } = await readBody(event);
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Không có quyền";

    const value = search?.value?.trim();
    const status = search?.status;

    const match: any = {
      type: "withdraw",
    };

    if (status) {
      match.status = status;
    }

    let userIds: any[] = [];

    if (value) {
      const users = await DB.User.find({
        phone: { $regex: value, $options: "i" },
      }).select("_id");

      userIds = users.map((u: any) => u._id);

      const isNumber = !isNaN(Number(value));

      match.$or = [
        ...(userIds.length ? [{ user: { $in: userIds } }] : []),
        { status: { $regex: value, $options: "i" } },
        ...(isNumber ? [{ amount: Number(value) }] : []),
      ];
    }

    const sortObj: any = {};

    sortObj[sort.column] = sort.direction === "desc" ? -1 : 1;

    const withdrawMatch = {
      type: "withdraw",
    };

    const [
      total,
      list,
      totalWithdraw,
      pendingWithdraw,
      successWithdraw,
      failedWithdraw,
    ] = await Promise.all([
      DB.Transaction.countDocuments(match),

      DB.Transaction.find(match)
        .populate("user", "username phone avatar")
        .sort(sortObj)
        .skip((current - 1) * size)
        .limit(size)
        .lean(),

      DB.Transaction.countDocuments({
        ...withdrawMatch,
      }),

      DB.Transaction.countDocuments({
        ...withdrawMatch,
        status: "pending",
      }),

      DB.Transaction.countDocuments({
        ...withdrawMatch,
        status: "success",
      }),

      DB.Transaction.countDocuments({
        ...withdrawMatch,
        status: "failed",
      }),
    ]);

    return resp(event, {
      result: {
        list,
        total,
        stats: {
          total: totalWithdraw,
          pending: pendingWithdraw,
          success: successWithdraw,
          failed: failedWithdraw,
        },
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});