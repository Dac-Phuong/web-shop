import jwt from "jsonwebtoken";
import md5 from "md5";

import { IDBUser } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const body = await readBody(event);
    const { username, country, phone, password, referralCode,confirmPassword } = body;

    // Validate Phone
    if(!username) throw "auth.fullNameRequired"
    if (!country || !phone) throw "auth.phoneRequired";
    const cleanPhone = phone.replace(/\s+/g, "").trim();
    if (/^0/.test(cleanPhone)) throw "auth.phoneCannotStartWithZero";
    const fullPhone = `${country}${cleanPhone}`;
    if (!/^\+\d{8,15}$/.test(fullPhone)) throw "auth.invalidPhoneFormat";

    // Validate Password
    if (!password) throw "auth.passwordRequired";
    if (password.length < 6 || password.length > 15) throw "auth.passwordLength";
    if (/\s/g.test(password)) throw "auth.passwordNoSpaces";

    if (!confirmPassword) throw "auth.confirmPasswordRequired";
    if (confirmPassword.length < 6 || confirmPassword.length > 15) throw "auth.confirmPasswordLength";
    if (/\s/g.test(confirmPassword)) throw "auth.confirmPasswordNoSpaces";
    if (password !== confirmPassword) throw "auth.confirmPasswordMismatch";

    // check ref
    if(!referralCode) throw "auth.referralCodeRequired"
    const checkRef = await DB.User.findOne({"referral.code": referralCode}).select("referral");
    if (!checkRef) throw "auth.referralCodeInvalid";
    // Check User Exists
    const userCheck = (await DB.User.findOne({ phone: fullPhone }).select("phone")) as IDBUser;
    if (userCheck) throw "auth.phoneExist";

    // Random Referral Code
    const randomCode = () => {
      let result = "";
      for (let i = 0; i < 6; i++) {
        result += Math.floor(Math.random() * 10);
      }
      return result;
    };

    // Create Unique Code
    let referral = {
      code: randomCode(),
      person: null,
      count: 0,
    };

    let checkCode = true;

    while (checkCode) {
      const code = randomCode();
      const exists = await DB.User.findOne({ "referral.code": code }).select("_id",);
      if (!exists) {
        referral.code = code;
        checkCode = false;
      }
    }

    // Check Referral
    if (referralCode) {
      const referraler = await DB.User.findOne({ "referral.code": referralCode.toUpperCase()}).select("_id");
      if (!referraler) throw "auth.referralNotFound";

      referral.person = referraler._id;
      await DB.User.updateOne(
        {
          _id: referraler._id,
        },
        {
          $inc: {
            "referral.count": 1,
          },
        },
      );
    }

    // IP
    const IP = getRequestIP(event, { xForwardedFor: true });

    // Create User
    const user = await DB.User.create({
      username: username,
      phone: fullPhone,
      password: md5(password),

      avatar: "/images/user/default.png",
      referral,
      coin: 0,
    });

    // Create Token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      runtimeConfig.apiSecret,
      {
        expiresIn: "360d",
      },
    );

    // Save Cookie
    setCookie(event, "token-auth", token, runtimeConfig.public.cookieConfig);

    user.token = token;
    await user.save();

    // Save IP
    await DB.LogUserIP.create({
      user: user._id,
      ip: IP,
    });

    // Save Log
    await logUser(event, user._id, "Đăng ký tài khoản");

    return resp(event, {
      code: 200,
      message: "auth.registerSuccess",
    });
  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
    });
  }
});
