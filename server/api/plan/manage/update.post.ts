import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const {
      id,
      name,
      description,
      price,
      level,
      commission,
      maxOrders,
    } = body;

    // AUTH
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    // VALIDATE
    if (!id) throw "Không tìm thấy gói VIP";
    if (!name?.trim())  throw "Tên gói VIP không được để trống";
    if (Number(price) < 0) throw "Giá gói không hợp lệ";
    if (Number(level) < 0) throw "Cấp độ gói không hợp lệ";
    if (Number(commission) < 0) throw "Hoa hồng không hợp lệ";
    if (Number(maxOrders) <= 0) throw "Số đơn/ngày không hợp lệ";

    // FIND PLAN
    const plan = await DB.Plan.findById(id);
    if (!plan) throw "Gói VIP không tồn tại";

    // CHECK DUPLICATE NAME
    const exists = await DB.Plan.findOne({_id: { $ne: id }, name: name.trim() });
    if (exists) throw "Tên gói VIP đã tồn tại";

    // UPDATE
    plan.name = name.trim();
    plan.description = description || "";
    plan.price = Number(price);
    plan.level = Number(level),
    plan.commission = Number(commission);
    plan.maxOrders = Number(maxOrders);

    await plan.save();

    return resp(event, {
      message: "Cập nhật gói VIP thành công",
    });
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});