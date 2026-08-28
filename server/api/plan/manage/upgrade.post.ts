import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { userId, planId } = body;

    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1)  throw "Bạn không phải quản trị viên";
    // VALIDATE
    if (!userId || !planId) throw "Dữ liệu không hợp lệ";

    // FIND USER
    const user = await DB.User.findById(userId);

    if (!user) throw "Không tìm thấy người dùng";

    // FIND PLAN
    const plan = await DB.Plan.findById(planId);
    if (!plan) throw "Gói VIP không tồn tại";

    // UPDATE USER VIP
    user.level = plan.level;

    await user.save();

    // CREATE HISTORY
    await DB.HistoryPlan.create({
      user: user._id,
      plan: plan._id,
      status: "active",
    });
    !!IO && IO.to(`user_${user._id}`).emit("auth-update");
    return resp(event, {
      message: "Nâng VIP thành công",
    });
  } catch (err: any) {
    return resp(event, {
      code: 400,
      message: err.toString(),
    });
  }
});
