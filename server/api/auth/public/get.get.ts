import { IAuth, IDBUser, IDBUserLogin, IDBUserStore } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    // Get User
    const auth = (await getAuth(event)) as IAuth;
    const user = (await DB.User.findOne({ _id: auth._id })) as IDBUser;

    // Get Date
    const now = new Date();
    const nowDate = formatDate(now);
    const IP = getRequestIP(event, { xForwardedFor: true });

    // User Login
    let createNewLogin = false;
    const lastLogin = (await DB.UserLogin.findOne({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(1)) as IDBUserLogin;
    if (!lastLogin) createNewLogin = true;
    else {
      const lastLoginDate = formatDate(lastLogin.createdAt);
      if (lastLoginDate.day != nowDate.day) createNewLogin = true;
    }
    if (!!createNewLogin) await DB.UserLogin.create({ user: user._id });

    // Save
    await user.save();

    // Result
    const userStore: IDBUserStore = {
      _id: user._id,
      username: user.username,
      phone: user.phone,
      level: user.level,
      avatar: user.avatar,
      status: user.kyc.status,
      type: user.type,
      referralCode: user.referral,
      withdrawStatus: user.withdraw.status,
      coin: user.coin,
      block: user.block,
    };

    return resp(event, { result: userStore });
  } catch (e: any) {
    return resp(event, { code: 401, message: e.toString() });
  }
});
