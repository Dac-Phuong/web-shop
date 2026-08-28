import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    const body = await readBody(event);

    const page = Number(body.page || 1);
    const limit = Number(body.limit || 10);

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      DB.Order.find({
        user: auth._id,
      })
        .populate("product")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      DB.Order.countDocuments({
        user: auth._id,
      }),
    ]);

    const totalProfitAgg = await DB.Order.aggregate([
      {
        $match: {
          user: auth._id,
        },
      },
      {
        $group: {
          _id: null,
          totalProfit: {
            $sum: {
              $toDouble: "$profit",
            },
          },
        },
      },
    ]);

    const totalProfit = totalProfitAgg?.[0]?.totalProfit || 0;

    return resp(event, {
      result: {
        totalOrders: total,
        totalProfit,
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
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
