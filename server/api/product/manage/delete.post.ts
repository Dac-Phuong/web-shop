import mongoose from "mongoose";
import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    // VALIDATE
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw "ID sản phẩm không hợp lệ";
    }

    // AUTH
    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) {
      throw "Bạn không phải quản trị viên";
    }

    // CHECK PRODUCT
    const product = await DB.Product.findById(id);

    if (!product) {
      throw "Sản phẩm không tồn tại";
    }

    // DELETE
    await DB.Product.deleteOne({
      _id: id,
    });

    return resp(event, {
      message: "Xóa sản phẩm thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
