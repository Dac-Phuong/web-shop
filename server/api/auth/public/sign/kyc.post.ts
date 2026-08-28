import { notifyAdmin } from "~~/server/utils/notifySocket";
import { saveFile } from "~~/server/utils/saveFile";
import { IAuth, IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    const user = (await DB.User.findById(auth._id)) as IDBUser;

    const formData = await readMultipartFormData(event);

    if (!formData) throw "kyc.noData";

    let frontImage = "";
    let backImage = "";

    for (const item of formData) {
      if (item.name === "front" && item.filename) {
        const path = `/uploads/kyc/${Date.now()}-front-${item.filename}`;
        await saveFile(item.data, path);
        frontImage = path;
      }

      if (item.name === "back" && item.filename) {
        const path = `/uploads/kyc/${Date.now()}-back-${item.filename}`;
        await saveFile(item.data, path);
        backImage = path;
      }
    }

    // Validate
    if (!frontImage) throw "kyc.frontRequired";
    if (!backImage) throw "kyc.backRequired";

    // Check if already pending/approved
    if (user.kyc?.status === 1) throw "kyc.pending";
    if (user.kyc?.status === 2) throw "kyc.verified";

    // Update user KYC
    user.kyc = {
      frontImage,
      backImage,
      status: 1, // pending
      rejectReason: "",
    };

    await user.save();
    await logUser(event, user._id, "Gửi KYC xác minh");
    await notifyAdmin({
      type: "kyc", 
      title: "Xác thực KYC",
      content: `${user.phone} vừa gửi yêu cầu KYC`,
    });
    return resp(event, {
      code: 200,
      message: "kyc.submitSuccess",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
    });
  }
});
