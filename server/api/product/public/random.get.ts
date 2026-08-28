import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    const user = await DB.User.findById(auth._id);
    const dayjs = global.DayJS;
    const startOfDay = dayjs().tz().startOf("day").toDate();
    const endOfDay = dayjs().tz().endOf("day").toDate();
    const vipLimits: Record<number, number> = {
      1: 1000,
      2: 3000,
      3: 5000,
      4: 10000,
      5: 30000,
      6: 50000,
      7: 100000,
      8: 300000,
      9: 500000,
    };
    const maxPrice = vipLimits[user.level] || 1000;

    const plan = await DB.Plan.findOne({ level: user.level });
    if (!plan) throw "planNotFound"; 
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
    // Ưu tiên sản phẩm đóng băng
    const freeze = await DB.ProductFreeze.findOne({ user: auth._id, status: { $in: [0, 1] } }).populate("product").lean();
    if (freeze?.product) {
      const startFreezeDay = dayjs(freeze.createdAt).tz().startOf("day").toDate();
      const totalOrder = await DB.Order.countDocuments({ user: auth._id, createdAt: { $gte: startFreezeDay}});
      if (totalOrder + 1 >= Number(freeze.number)) {
        return resp(event, { result: freeze.product});
      }
    }
     // lấy ra sản phẩm pendding 
    const pendingOrder = await DB.Order.findOne({ user: auth._id, status: 0 }).populate("product").lean();
      if (pendingOrder) {
        return resp(event, { result: pendingOrder.product });
      }
    // Random theo VIP
    const [product] = await DB.Product.aggregate([{ $match: {price: {$lt: maxPrice}}},{ $sample: { size: 1}}]);
    if (!product) throw "productNotFound"

    // tạo đơn hàng
    await DB.Order.create({
      product: product._id,
      user: user._id,
      profit: 0,
      code: "OD" + Date.now().toString(36).toUpperCase().slice(-6),
      status: 0,
    });

    return resp(event, {
      result: product ,
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e?.key || e?.message || e?.toString(),
      params: e?.params || {},
    });
  }
});
