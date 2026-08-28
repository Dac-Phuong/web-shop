export default defineEventHandler(async (event) => {
  try {
    const { key = "" } = await readBody(event);

    const keyword = key.trim();

    const match: any = {
      type: {
        $nin: [3, 99],
      },
    };

    if (keyword) {
      const regex = new RegExp(
        keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );

      match.$or = [
        {
          phone: regex,
        },
      ];
      match.type = { $nin: [3, 99] };
    }

    const users = await DB.User.find(match)
      .select("_id username avatar type level phone")
      .sort({
        createdAt: -1,
      })
      .limit(20)
      .lean();

    return resp(event, {
      result: users,
    });
  } catch (e: any) {
    console.error(e);

    return resp(event, {
      result: [],
    });
  }
});
