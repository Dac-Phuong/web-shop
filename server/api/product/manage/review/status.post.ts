import { Types } from "mongoose";
import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    if (!id || !Types.ObjectId.isValid(id)) throw "ID không hợp lệ";
    // AUTH
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";
    // PRODUCT CHECK
    const existingFreeze = await DB.ProductFreeze.findById(id);
    if (!existingFreeze) throw "Đánh giá không tồn tại";
    // CHECK PRODUCT

    // UPDATE
    await DB.ProductFreeze.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          status: existingFreeze.status === 0 ? 1 : 0,
        },
      },
    );
    return resp(event, {
      message: "Cập nhật trạng thái thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
