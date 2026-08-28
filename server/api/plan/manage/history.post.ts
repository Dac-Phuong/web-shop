import mongoose from "mongoose";
import type { IAuth } from "~~/types";

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
    const sorting: any = {};

    sorting[sort.column] = sort.direction === "desc" ? -1 : 1;

    // SEARCH
    const match: any = {};
    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const value = search?.value?.trim();
    // SEARCH USER
    if (value) {
      const safeValue = escapeRegex(value);
      const users = await DB.User.find({
        $or: [
          {
            phone: {
              $regex: safeValue,
              $options: "i",
            },
          },

          {
            name: {
              $regex: safeValue,
              $options: "i",
            },
          },

          {
            username: {
              $regex: safeValue,
              $options: "i",
            },
          },
        ],
      })
        .select("_id")
        .lean();

      const userIds = users.map(
        (item: any) => new mongoose.Types.ObjectId(item._id),
      );

      match.$or = [
        {
          status: {
            $regex: safeValue,
            $options: "i",
          },
        },

        {
          user: {
            $in: userIds,
          },
        },
      ];
    }

    // QUERY
    const [total, list] = await Promise.all([
      DB.HistoryPlan.countDocuments(match),

      DB.HistoryPlan.find(match)
        .populate({
          path: "user",
          select: "name avatar phone username",
        })
        .populate({
          path: "plan",
          select: "name level price commission maxOrders",
        })
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
