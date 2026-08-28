import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search } = await readBody(event);

    if (!size || !current) throw "Dữ liệu phân trang sai";

    if (!sort?.column || !sort?.direction)  throw "Dữ liệu sắp xếp sai";

    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    const sorting: any = {};

    sorting[sort.column] = sort.direction === "desc" ? -1 : 1;

    const match: any = {};

    const value = search?.value?.trim();

    if (value) {
      match.name = {
        $regex: value,
        $options: "i",
      };
    }

    const [total, list] = await Promise.all([
      DB.Plan.countDocuments(match),

      DB.Plan.find(match)
        .sort(sorting)
        .skip((current - 1) * size)
        .limit(size)
        .lean(),
    ]);

    return resp(event, {
      result: {
        list,
        total,
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
