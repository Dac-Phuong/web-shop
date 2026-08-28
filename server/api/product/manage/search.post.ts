import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { keyword } = await readBody(event);

    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    const match: any = {
      status: false,
    };

    const search = keyword?.trim();
    if (search) {
      const conditions: any[] = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
      ];

      conditions.push({
        $expr: {
          $regexMatch: {
            input: {
              $toString: "$price",
            },
            regex: search,
            options: "i",
          },
        },
      });

      match.$or = conditions;
    }

    const list = await DB.Product.find(match)
      .select("_id name image price status")
      .sort({
        createdAt: -1,
      })
      .limit(50)
      .lean();

    return resp(event, {
      result: list,
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});