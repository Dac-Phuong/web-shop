import { Types } from "mongoose";

export interface IDBBankAccount {
  _id: Types.ObjectId;

  user: Types.ObjectId;

  bankName: string;
  accountNumber: string;
  accountName: string;
  address: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IDBTransaction {
  _id: Types.ObjectId;

  user: Types.ObjectId;

  type: "deposit" | "withdraw";
  method: "bank" | "usdt" | "manual";
  amount: number;

  note?: string;

  payment: {
    bank?: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      address: string;
    }
    usdt?: {
      wallet: string;
      address: string;
    }
  }

  status: "pending" | "success" | "failed";

  createdAt: Date;
  updatedAt: Date;
}