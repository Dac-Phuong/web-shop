import { Types } from "mongoose";
import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { product, user, number } = await readBody(event);

    if (!product || !Types.ObjectId.isValid(product)) throw "Sản phẩm không hợp lệ";
    if (!user || !Types.ObjectId.isValid(user)) throw "Người dùng không hợp lệ";
    if(!Number(number) || Number(number) <= 0) throw "Số lượng đơn hàng không hợp lệ";
    // AUTH
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";
    // PRODUCT CHECK
    const existingProduct = await DB.Product.findById(product);
    if (!existingProduct) throw "Sản phẩm không tồn tại";
    // USER CHECK
    const existingUser = await DB.User.findById(user);
    if (!existingUser) throw "Người dùng không tồn tại";
    if(existingUser.level == 0) throw "Người dùng chưa nâng VIP";
    // 
   const existingPlan = await DB.Plan.findOne({ level: existingUser.level});
   if (number > existingPlan?.maxOrders) throw `VIP ${existingUser.level} tối đa chỉ có ${existingPlan?.maxOrders} đơn`;
    // CREATE
    await DB.ProductFreeze.create(
      {
        product: new Types.ObjectId(product),
        user: new Types.ObjectId(user),
        number: number,
        status: 0,
      },
    );
    return resp(event, {
      message: "Thêm vào danh sách thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
