import type { Types } from "mongoose"

export interface IDBUser {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  username: string
  password: string
  email: string
  phone: string
  avatar: string;
  level: number;
  referral: {
    code: string;
    person: Types.ObjectId;
    count: number;
  }
  kyc: {
    frontImage: string
    backImage: string
    status: number
    rejectReason: string
  }
  withdraw:{
    password:string
    status: number
  }
  coin: number
  type: number
  block: number
  token: string
  // Function
  save: {
    (): void
  }
}

export interface IDBUserLogin {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  user: Types.ObjectId
}

export interface IDBUserStore {
  _id?: Types.ObjectId
  username?: IDBUser["username"]
  phone?: IDBUser["phone"]
  avatar?: IDBUser["avatar"]
  level?: number
  status?: IDBUser["kyc"]["status"]
  type?: IDBUser["type"]
  referralCode?: IDBUser["referral"]
  withdrawStatus: IDBUser["withdraw"]["status"]
  coin?: number
  block?: IDBUser["block"]
}

export interface IDBPlan {
  _id: Types.ObjectId

  name: string
  description: string

  price: number
  level: number
  commission: number

  limit:number
  maxOrders: number

  createdAt: Date
  updatedAt: Date
}

export interface IDBHistoryPlan {
  _id: Types.ObjectId

  user: Types.ObjectId
  plan: Types.ObjectId

  status: "pending" | "active" | "expired" | "cancelled"

  createdAt: Date
  updatedAt: Date
}
