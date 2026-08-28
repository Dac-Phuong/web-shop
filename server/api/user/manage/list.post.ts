import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search } = await readBody(event);

    if (!size || !current) {
      throw "Dữ liệu phân trang sai";
    }

    if (!sort?.column || !sort?.direction) {
      throw "Dữ liệu sắp xếp sai";
    }

    // AUTH
    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) throw "Bạn không phải quản trị viên";

    // SORT
    const sorting: any = {};

    sorting[sort.column] = sort.direction === "desc" ? -1 : 1;

    // MATCH
    const match: any = {};

    // Ẩn tài khoản hệ thống
    match.type = { $nin: [3, 99] };

    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const value = search?.value?.trim();

    if (value) {
      const safeValue = escapeRegex(value);

      match.$or = [
        {
          username: {
            $regex: safeValue,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: safeValue,
            $options: "i",
          },
        },
        {
          email: {
            $regex: safeValue,
            $options: "i",
          },
        },
        {
          "referral.code": {
            $regex: safeValue,
            $options: "i",
          },
        },
      ];
    }

    const [total, unverified, waitingVerify, verified, blocked, list, plans] =
      await Promise.all([
        // TOTAL USER
        DB.User.countDocuments(match),

        // UNVERIFY
        DB.User.countDocuments({
          ...match,
          "kyc.status": 0,
        }),

        // WAITING
        DB.User.countDocuments({
          ...match,
          "kyc.status": 1,
        }),

        // VERIFIED
        DB.User.countDocuments({
          ...match,
          "kyc.status": 2,
        }),

        // BLOCKED
        DB.User.countDocuments({
          ...match,
          block: 1,
        }),

        // USER LIST
        DB.User.find(match)
          .sort(sorting)
          .skip((current - 1) * size)
          .limit(size)
          .lean(),

        // VIP PLANS
        DB.Plan.find({})
          .sort({
            price: 1,
          })
          .lean(),
      ]);

    return resp(event, {
      result: {
        list,
        plans,
        total,

        status: {
          totalUser: total,
          unverified,
          waitingVerify,
          verified,
          blocked,
        },
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});
