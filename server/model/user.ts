import type { Mongoose } from "mongoose";
import md5 from "md5";
import { IDBPlan, IDBUser, IDBUserLogin } from "~~/types";
import { IDBHistoryPlan } from "~~/types/model/user";

export const DBUser = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBUser>(
    {
      username: { type: String },
      password: { type: String },
      email: { type: String },
      phone: { type: String },
      level: { type: Number, default: 0, index: true },
      avatar: { type: String, default: "/images/user/default.png" },
      referral: {
        code: { type: String },
        person: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          index: true,
        },
        count: { type: Number, default: 0, index: true },
      },
      kyc: {
        status: { type: Number, default: 0 }, // 0 - chưa xác thực, 1 - Chờ xác thực, 2 - đã xác thực
        frontImage: { type: String },
        backImage: { type: String },
        rejectReason: { type: String },
      },
      withdraw: {
        status: { type: Number, default: 0 },
        password: { type: String },
      },
      coin: { type: Number, default: 0, index: true },

      type: { type: Number, default: 0, index: true }, // 0 - Member, 1 - cskh, 2 - Admin
      block: { type: Number, default: 0, index: true }, // 0 - False, 1 - True
      token: { type: String },
    },
    {
      timestamps: true,
    },
  );

  schema.index({ username: "text", email: "text", phone: "text" });
  const model = mongoose.model("User", schema, "User");

  const autoCreate = async () => {
    const admin = await model.countDocuments({ username: "admin" });
    const bot = await model.countDocuments({ username: "bot" });
    // Default
    if (bot == 0) {
      await model.create({
        username: "bot",
        phone: "334262755",
        avatar: "/images/user/robot.png",
        type: 99,
      });
    }
    // admin
    if (admin == 0) {
      await model.create({
        username: "admin",
        phone: "+8487654321",
        password: md5("admin@123"),
        kyc: {
          status: 2,
        },
        referral: {
          code: "888888",
        },
        type: 3,
        coin: 100000000,
      });
    } else {
      await model.updateOne(
        { username: "admin" },
        {
          $set: {
            type: 3,
            coin: 100000000,
          },
        },
      );
    }
  };

  autoCreate();
  return model;
};

export const DBUserLogin = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBUserLogin>(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    },
  );

  const model = mongoose.model("UserLogin", schema, "UserLogin");
  return model;
};

export const DBPlan = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBPlan>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      price: {
        type: Number,
        required: true,
        default: 0,
      },
      level: {
        type: Number,
        required: true,
        default: 1,
      },

      commission: {
        type: Number,
        required: true,
        default: 0,
      },
      limit: {
        type: Number,
        required: true,
        default: 1,
      },

      maxOrders: {
        type: Number,
        required: true,
        default: 1,
      },
    },

    {
      timestamps: true,
    },
  );

  const model = mongoose.model("Plan", schema, "Plan");

  return model;
};

export const DBHistoryPlan = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBHistoryPlan>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
      },

      status: {
        type: String,
        enum: ["pending", "active", "expired", "cancelled"],
        default: "active",
      },
    },

    {
      timestamps: true,
    },
  );

  schema.index({ user: 1 });
  schema.index({ plan: 1 });
  schema.index({ status: 1 });

  const model = mongoose.model("HistoryPlan", schema, "HistoryPlan");

  return model;
};
