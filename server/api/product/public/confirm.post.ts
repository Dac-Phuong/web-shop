import { IAuth } from "~~/types";
import { Types } from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;

    const body = await readBody(event);
    const { productId } = body;

    if (!productId) throw "productNotFound";

    const user = await DB.User.findOne({ _id: auth._id });
    const product = await DB.Product.findOne({ _id: productId });
    if (!product) throw "partnerNotFound";

    const plan = await DB.Plan.findOne({ level: user.level });
    if (!plan) throw "planNotFound";

    const freeze = await DB.ProductFreeze.findOne({user: auth._id, status: { $in: [0, 1] }, product: product._id}).populate("product").lean();
    if (freeze) {
      const userBalance = Number(user.coin || 0);
      const orderAmount = Number(product.price || 0);
      if (userBalance < orderAmount) {
        const requiredAmount = Number((orderAmount - userBalance).toFixed(2));
        throw { key: "freezeOrderRequired", params: { amount: `$${requiredAmount}` }};
      }
    }

    const dayjs = global.DayJS;
    const startOfDay = dayjs().tz().startOf("day").toDate();
    const endOfDay = dayjs().tz().endOf("day").toDate();

    const orderTodayCount = await DB.Order.countDocuments({
      user: user._id,
      status: 1,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (orderTodayCount >= plan.maxOrders) {
      throw { key: "dailyOrderLimit", params: { maxOrders: plan.maxOrders }};
    }
    const commission = Number(plan.commission || 0);
    const profit = ((Number(product.price || 0) * commission) / 100).toFixed(2);

    // CODE ORDER
    await DB.Order.updateOne(
    {
        user: auth._id,
        product: product._id,
        status: 0,
      },
      {
        $set: {
          status: 1,
          profit,
        },
      }
    );
    // AUTO CỘNG COIN USER
    await DB.User.updateOne(
      { _id: user._id },
      {
        $inc: {
          coin: Number(profit),
        },
      },
    );
    // AUTO FREEZE
    await DB.ProductFreeze.updateOne({ product: product._id, user: user._id, status: { $in: [0, 1] } },{ $set: { status: 3 } });
    // NOTIFY
    !!IO && IO.to(`user_${user._id}`).emit("auth-update");
    return resp(event, {
      result: {
        profit,
        commission,
        orderToday: orderTodayCount + 1,
        maxOrders: plan.maxOrders,
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e?.key || e?.message || e?.toString(),
      params: e?.params || {},
    });
  }
});
