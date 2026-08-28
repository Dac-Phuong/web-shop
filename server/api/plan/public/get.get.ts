export default defineEventHandler(async (event) => {
  try {
    const plans = await DB.Plan.find({});
    return resp(event, { result: plans });
  } catch (e: any) {
    return resp(event, { code: 500, message: e.toString() });
  }
});
