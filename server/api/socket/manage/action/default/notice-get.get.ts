import type { IAuth } from "~/types/utils";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    const notify = await DB.SocketNotify.findOne({}).select('display content').lean()
    return resp(event, {result: notify });
  } catch (e: any) {
    return resp(event, { message: e.toString() });
  }
});
