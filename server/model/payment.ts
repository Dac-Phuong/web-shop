import type { Mongoose } from "mongoose";
import { IDBBankAccount, IDBTransaction } from "~~/types/model/payment";

export const DBBankAccount = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBBankAccount>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },  

      bankName: {
        type: String,
        required: true,
        trim: true,
      },

      accountNumber: {
        type: String,
        required: true,
        trim: true,
      },

      accountName: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },
    },

    {
      timestamps: true,
    },
  );

  schema.index({ user: 1 });
  const model = mongoose.model("BankAccount", schema, "BankAccount");
  return model;
};

export const DBTransaction = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBTransaction>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        enum: ["deposit", "withdraw"],
        required: true,
      },
      method: {
        type: String,
        enum: ["bank", "usdt", "manual"],
        required: true,
        default: "manual",
      },
      payment:{
        bank: {
          bankName: String,
          accountNumber: String,
          accountName: String,
          address: String,
        },
        usdt: {
          wallet: String,
          address: String,
        }
      },

      amount: {
        type: Number,
        required: true,
        default: 0,
      },

      note: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "success",
          "failed",
        ],
        default: "pending",
      },
    },

    {
      timestamps: true,
    },
  );

  schema.index({ user: 1 });
  schema.index({ status: 1 });
  schema.index({ type: 1 });

  const model = mongoose.model(
    "Transaction",
    schema,
    "Transaction",
  );

  return model;
};
