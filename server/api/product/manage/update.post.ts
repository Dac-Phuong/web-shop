import mongoose from "mongoose";
import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const {
      id,
      name,
      image,
      price,
      type,
    } = body;
    
    // VALIDATE
    if (!id || !mongoose.Types.ObjectId.isValid(id)) throw "ID sản phẩm không hợp lệ";
    if (!name) throw "Tên sản phẩm không được bỏ trống";
    if (!image) throw "Hình ảnh sản phẩm không được bỏ trống";
    if (!price || Number(price) <= 0) throw "Giá sản phẩm không hợp lệ";

    // AUTH
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    // CHECK PRODUCT
    const product = await DB.Product.findById(id);
    if (!product) throw "Sản phẩm không tồn tại";

    // UPDATE
    await DB.Product.updateOne(
      {
        _id: id,
      },

      {
        $set: {
          name: name.trim(),
          image: image.trim(),
          price: Number(price),
          type: Number(type),
        },
      },
    );

    return resp(event, {
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});