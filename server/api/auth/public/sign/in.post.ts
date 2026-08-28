import md5 from "md5";
import jwt from "jsonwebtoken";

import { IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const IP = getRequestIP(event, {
      xForwardedFor: true,
    });

    const runtimeConfig = useRuntimeConfig();

    const body = await readBody(event);

    const { country, phone, password } = body;

    // Validate
    if (!country || !phone || !password) throw "auth.requiredFields";
    const fullPhone = `${country}${phone}`.replace(/\s+/g, "").trim();
    // Find User
    const user = (await DB.User.findOne({phone: fullPhone}).select("phone password block login type kyc token")) as IDBUser;

    // Check User
    if (!user) throw "auth.accountNotFound";
    if (md5(password) !== user.password) throw "auth.wrongPassword";
    if (user.block == 1 || user?.kyc.status == 3) throw "auth.accountBlocked";
    // Create Token
    const token = jwt.sign({ _id: user._id }, runtimeConfig.apiSecret, {
      expiresIn: "360d",
    });

    // Save Cookie
    setCookie(event, "token-auth", token, runtimeConfig.public.cookieConfig);
    // Save Token
    user.token = token;

    await user.save();
    // Save IP
    const logIP = await DB.LogUserIP.findOne({
      user: user._id,
      ip: IP,
    });

    if (!logIP) {
      await DB.LogUserIP.create({
        user: user._id,
        ip: IP,
      });
    }

    // Log
    await logUser(event, user._id, `Đăng nhập với IP <b>${IP}</b>`);
    return resp(event, {
      code: 200,
      message: "auth.loginSuccess",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
    });
  }
});
