import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { id, reason } = await readBody(event);

    if (!id) throw "Thiếu ID";
    if (!reason) throw "Thiếu lý do hủy";

    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Không có quyền";

    const tx = await DB.Transaction.findById(id);
    if (!tx) throw "Không tồn tại giao dịch";

    if (tx.type !== "withdraw") throw "Sai loại giao dịch";
    if (tx.status !== "pending") throw "Giao dịch đã xử lý";

    tx.status = "failed";
    tx.note = reason;
    tx.updatedAt = new Date();
    await tx.save();

    return resp(event, {
      message: "Hủy rút tiền thành công",
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
