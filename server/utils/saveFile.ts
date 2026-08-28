import fs from "fs";
import path from "path";

export const saveFile = async (buffer: Buffer, filePath: string) => {
  const fullPath = path.join(process.cwd(), "public", filePath);

  // tạo thư mục nếu chưa có
  await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });

  // ghi file
  await fs.promises.writeFile(fullPath, buffer);

  return filePath; // trả về path để lưu DB
};