export default defineEventHandler(async (event) => {
  try {
    const notify = await DB.SocketNotify.findOne({});
    return resp(event, { result: notify });
  } catch (e: any) {
    return resp(event, { message: e.toString() });
  }
});
