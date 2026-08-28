import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const {
      name,
      description,
      price,
      commission,
      level,
      maxOrders,
    } = body;

    // AUTH
    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    // VALIDATE
    if (!name?.trim()) throw "Tên gói VIP không được để trống";
    if (Number(price) < 0) throw "Giá gói không hợp lệ";
    if (Number(commission) < 0) throw "Hoa hồng không hợp lệ";
    if (Number(level) < 0 ) throw "Cấp độ gói không hợp lệ";
    if (Number(maxOrders) <= 0 ) throw "Số đơn/ngày không hợp lệ";

    // CHECK EXISTS
    const exists = await DB.Plan.findOne({
      name: name.trim(),
    });

    if (exists) throw "Tên gói VIP đã tồn tại";

    // CREATE
    await DB.Plan.create({
      name: name.trim(),
      description: description || "",
      price: Number(price),
      level: Number(level),
      commission: Number(commission),
      maxOrders: Number(maxOrders),
    });

    return resp(event, {
      message: "Tạo gói VIP thành công",
    });
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});