import fs from "fs";
import path from "path";
import multer from "multer";
import md5 from "md5";

const uploadPath = path.join(process.cwd(), "public/uploads");

// CREATE FOLDER
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const hash = md5(file.originalname + Date.now());

    const prefix = file.mimetype.startsWith("video/") ? "video" : "file";

    cb(null, `${prefix}-${hash}.${ext}`);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024, 
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ hỗ trợ hình ảnh hoặc video"));
    }
  },
});

export default defineEventHandler(async (event) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single("image")(
        event.node.req as any,
        event.node.res as any,
        (err: any) => {
          if (err) reject(err);
          else resolve(true);
        },
      );
    });

    // @ts-ignore
    const file = event.node.req.file;

    if (!file) {
      throw new Error("Không tìm thấy file");
    }

    const url = `/uploads/${file.filename}`;

    return resp(event, {
      message: "Upload thành công",
      result: {
        url,
        type: file.mimetype.startsWith("video/") ? "video" : "image",
      },
    });
  } catch (e: any) {
    return resp(event, {
      code: 500,
      message: e?.message || "Upload thất bại",
    });
  }
});
