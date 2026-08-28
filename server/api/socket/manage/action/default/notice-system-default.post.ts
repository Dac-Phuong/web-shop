import { IAuth } from "~/types/utils";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    const { content, display } = await readBody(event);
    if (!content || display === undefined) throw "Vui lòng thêm nội dung thông báo";
    
    const notify = await DB.SocketNotify.findOneAndUpdate(
      {},
      {
        content,
        display,
        updated_at: new Date(),
      },
      {
        new: true,
        upsert: true, 
      }
    );
    return resp(event, { message: "Thao tác thành công", result: notify,});
  } catch (e: any) {
    return resp(event, {code: 400, message: e.toString(), });
  }
});
