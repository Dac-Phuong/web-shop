import type { Mongoose } from "mongoose";
import { DBConfig } from "./config";
import { DBHistoryPlan, DBPlan, DBUser, DBUserLogin } from "./user";
import { DBLogAdmin, DBLogUser, DBLogUserIP, DBLogBlockIP } from "./log";
import { DBAdminIP } from "./ip";

import { DBSocketChat, DBSocketNotify, DBSocketOnline } from "./socket";

import { IGlobalDB } from "~~/types";
import { DBBankAccount, DBTransaction } from "./payment";
import { DBOrder, DBProduct, DBProductFreeze } from "./product";

export default (mongoose: Mongoose): IGlobalDB => {
  return {
    Config: DBConfig(mongoose),

    User: DBUser(mongoose),
    UserLogin: DBUserLogin(mongoose),

    Plan: DBPlan(mongoose),
    HistoryPlan: DBHistoryPlan(mongoose),

    BankAccount: DBBankAccount(mongoose),
    Transaction: DBTransaction(mongoose),

    Product: DBProduct(mongoose),
    ProductFreeze: DBProductFreeze(mongoose),
    Order: DBOrder(mongoose),

    LogAdmin: DBLogAdmin(mongoose),

    LogBlockIP: DBLogBlockIP(mongoose),
    LogUser: DBLogUser(mongoose),
    LogUserIP: DBLogUserIP(mongoose),

    SocketOnline: DBSocketOnline(mongoose),
    SocketChat: DBSocketChat(mongoose),
    SocketNotify: DBSocketNotify(mongoose),

    AdminIP: DBAdminIP(mongoose),
  };
};
