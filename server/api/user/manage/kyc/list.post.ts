// server/api/user/manage/kyc/list.post.ts

import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search } = await readBody(event);

    if (!size || !current) {
      throw createError({
        statusCode: 400,
        statusMessage: "Dữ liệu phân trang sai",
      });
    }

    const auth = (await getAuth(event)) as IAuth;

    if (!auth?._id || auth.type < 1) {
      throw createError({
        statusCode: 403,
        statusMessage: "Bạn không phải quản trị viên",
      });
    }

    const sorting: any = {};
    sorting[sort?.column || "createdAt"] =
      sort?.direction === "asc" ? 1 : -1;

    const match: any = {
      "kyc.status": 1,
      type: { $nin: [3, 99] },
    };

    const [total, list] = await Promise.all([
      DB.User.countDocuments(match),

      DB.User.find(match)
        .select(`
          username
          phone
          avatar
          createdAt
          kyc
          referral
        `)
        .sort(sorting)
        .skip((current - 1) * size)
        .limit(size)
        .lean(),
    ]);

    return {
      code: 200,
      result: {
        list,
        total,
      },
    };
  } catch (e: any) {
    return {
      code: 500,
      message: e.statusMessage || e.toString(),
    };
  }
});