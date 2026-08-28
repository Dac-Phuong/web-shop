import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { id } = body;

    // AUTH
    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    // VALIDATE
    if (!id) throw "Không tìm thấy gói VIP";

    // FIND PLAN
    const plan = await DB.Plan.findById(id);
    if (!plan) throw "Gói VIP không tồn tại";

    // DELETE
    await DB.Plan.deleteOne({
      _id: id,
    });

    return resp(event, {
      message: "Xóa gói VIP thành công",
    });
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});
