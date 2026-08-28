import { IAuth } from "~~/types";
import { IDBOrder } from "~~/types/model/product";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    let bonus = false;
    const dayjs = global.DayJS;
    const user = await DB.User.findOne({ _id: auth._id });
    const plan = await DB.Plan.findOne({ level: user.level });
    const start = dayjs().tz().startOf("day").toDate();
    const end = dayjs().tz().endOf("day").toDate();
    //
    const freeze = await DB.ProductFreeze.findOne({user: auth._id, status: { $in: [0, 1] }}).populate("product").lean();
    if (freeze?.product) {
      const startFreezeDay = dayjs(freeze.createdAt).tz().startOf("day").toDate();
      const totalOrder = await DB.Order.countDocuments({ user: auth._id,status: 1, createdAt: { $gte: startFreezeDay}});
      // Đơn sắp tạo tiếp theo chính là +1
      if (totalOrder + 1 >= Number(freeze.number || 0)) {
       bonus = true
      }
    }

    const ordersToday = await DB.Order.find({user: user._id, status: 1, createdAt: { $gte: start, $lte: end }});
    const profitToday = ordersToday.reduce((sum: number, item: IDBOrder) => {
      return sum + Number(item.profit || 0);
    }, 0);

    const data = {
      maxOrders: plan?.maxOrders || 0,
      commission: plan?.commission || 0,
      orderToday: ordersToday.length,
      profitToday: profitToday,
      coin: user.coin,
      bonus: bonus,
    };

    return resp(event, {
      result: data,
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
