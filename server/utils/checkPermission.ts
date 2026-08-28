import type { H3Event } from "h3";
import { IAuth, IDBConfig } from "~~/types";

export default async (event: H3Event, type: string): Promise<void> => {
  try {
    const auth = event.context.auth as IAuth;

    const config = (await DB.Config.findOne().select("permission")) as IDBConfig;

    if (!config) throw "Không tìm thấy cấu hình trang";

    const permission = config.permission as any;

    const typeArray = type.split(".");
    if (typeArray.length !== 2) throw "Kiểu phân quyền không hợp lệ";
    const [group, action] = typeArray;
    if (!group || !action) throw "Kiểu phân quyền không hợp lệ";
    if (!permission[group]) throw "Kiểu dữ liệu phân quyền 1 không hợp lệ";
    if (!permission[group][action]) throw "Kiểu dữ liệu phân quyền 2 không hợp lệ";
    const arrType = permission[group][action];

    if (!arrType.includes(auth.type)) {
      throw "Bạn không có quyền thao tác";
    }
  } catch (e: any) {
    throw e.toString();
  }
};
