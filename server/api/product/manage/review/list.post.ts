import { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const { size, current, sort, search } = await readBody(event);

    // VALIDATE
    if (!size || !current) {
      throw "Dữ liệu phân trang sai";
    }

    if (!sort?.column || !sort?.direction) {
      throw "Dữ liệu sắp xếp sai";
    }

    // AUTH
    const auth = (await getAuth(event)) as IAuth;

    if (auth.type < 1) {
      throw "Bạn không phải quản trị viên";
    }

    // SORT
    const sorting: Record<string, 1 | -1> = {};

    sorting[sort.column] = sort.direction === "desc" ? -1 : 1;

    // FILTER
    const match: any = {};

    // SEARCH
    const keyword = search?.value?.trim();

    if (keyword) {
      const conditions: any[] = [];

      const [users, products] = await Promise.all([
        DB.User.find(
          {
            phone: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            _id: 1,
          },
        ).lean(),

        DB.Product.find(
          {
            name: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            _id: 1,
          },
        ).lean(),
      ]);

      const userIds = users.map((item: any) => item._id);
      const productIds = products.map((item: any) => item._id);

      if (userIds.length) {
        conditions.push({
          user: {
            $in: userIds,
          },
        });
      }

      if (productIds.length) {
        conditions.push({
          product: {
            $in: productIds,
          },
        });
      }

      // Không tìm thấy user hoặc product
      if (!conditions.length) {
        return resp(event, {
          result: {
            list: [],
            total: 0,
            stats: {
              total: 0,
              frozen: 0,
              completed: 0,
              unfrozen: 0,
            },
          },
        });
      }

      match.$or = conditions;
    }



    const [
      total,
      list,
      totalFreeze,
      frozen,
      completed,
      unfrozen,
    ] = await Promise.all([
      DB.ProductFreeze.countDocuments(match),

      // LIST
      DB.ProductFreeze.find(match)
        .populate({
          path: "user",
          select: "phone avatar username level",
        })
        .populate({
          path: "product",
        })
        .sort(sorting)
        .skip((current - 1) * size)
        .limit(size)
        .lean(),

      // STATS
      DB.ProductFreeze.countDocuments({}),

      DB.ProductFreeze.countDocuments({
        status: 0,
      }),

      DB.ProductFreeze.countDocuments({
        status: 3,
      }),

      DB.ProductFreeze.countDocuments({
        status: {
          $nin: [0, 3],
        },
      }),
    ]);

    return resp(event, {
      result: {
        list,
        total,

        stats: {
          total: totalFreeze,
          frozen,
          completed,
          unfrozen,
        },
      },
    });
  } catch (e: any) {
    console.error("PRODUCT FREEZE LIST ERROR:", e);

    return resp(event, {
      code: 500,
      message: e.toString(),
    });
  }
});