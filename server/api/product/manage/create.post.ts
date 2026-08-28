import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { name, image, price, type } = body;

    // VALIDATE
    if (!name) throw "Tên sản phẩm không được bỏ trống";
    if (!image) throw "Hình ảnh sản phẩm không được bỏ trống";
    if (!price || Number(price) <= 0) throw "Giá sản phẩm không hợp lệ";

    // AUTH
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    // CREATE
    await DB.Product.create({
      name: name.trim(),
      image: image.trim(),
      price: Number(price),
      type: Number(type),
    });

    return resp(event, {
      message: "Tạo sản phẩm thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
