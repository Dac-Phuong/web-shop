import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    if (!id) throw "Thiếu ID";

    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) throw "Không có quyền";

    const tx = await DB.Transaction.findById(id);

    if (!tx) throw "Không tồn tại giao dịch";
    if (tx.type !== "withdraw") throw "Sai loại giao dịch";
    if (tx.status !== "pending") throw "Giao dịch đã xử lý";

    tx.status = "success";
    tx.updatedAt = new Date();

    await tx.save();

    return resp(event, {
      message: "Duyệt rút tiền thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});