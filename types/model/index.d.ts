import type { Model } from "mongoose"
import { IDBConfig } from "./config"
import { IDBBankAccount, IDBTransaction } from "./payment"
import { IDBHistoryPlan, IDBPlan, IDBUser, IDBUserLogin } from "./user"
import { IDBLogAdmin, IDBLogBlockIP, IDBLogUser, IDBLogUserIP } from "./log"
import { IDBSocketChat, IDBSocketNotify, IDBSocketOnline } from "./socket"
import { IDBAdminIP } from "./ip"
import { IDBProduct, IDBOrder, IDBProductFreeze } from "./product"
export { IDBUser, IDBUserLogin, IDBUserStore, IDBPlan } from "./user"

export { IDBLogAdmin, IDBLogUser, IDBLogUserIP, IDBLogBlockIP } from "./log"

export { IDBAdminIP } from "./ip"
export { IDBSocketOnline, IDBSocketChat, IDBSocketNotify } from "./socket"

export interface IGlobalDB {
  Config: Model<IDBConfig>

  User: Model<IDBUser>
  UserLogin: Model<IDBUserLogin>

  Plan: Model<IDBPlan>
  HistoryPlan: Model<IDBHistoryPlan>

  BankAccount: Model<IDBBankAccount>
  Transaction: Model<IDBTransaction>

  Product: Model<IDBProduct>
  Order: Model<IDBOrder>
  ProductFreeze: Model<IDBProductFreeze>

  LogAdmin: Model<IDBLogAdmin>

  LogBlockIP: Model<IDBLogBlockIP>
  LogUser: Model<IDBLogUser>
  LogUserIP: Model<IDBLogUserIP>

  SocketOnline: Model<IDBSocketOnline>
  SocketChat: Model<IDBSocketChat>
  SocketNotify: Model<IDBSocketNotify>

  AdminIP: Model<IDBAdminIP>
}
