import type { Mongoose } from "mongoose";
import { IDBSocketChat, IDBSocketNotify, IDBSocketOnline } from "~~/types";

export const DBSocketOnline = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBSocketOnline>(
    {
      socket: { type: "String" },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    },
    {
      timestamps: true,
    },
  );

  const model = mongoose.model("SocketOnline", schema, "SocketOnline");

  const autoCreate = async () => {
    await model.deleteMany();
  };
  autoCreate();

  return model;
};

export const DBSocketChat = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBSocketChat>(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      message: {
        type: String,
        trim: true,
        default: "",
      },
      fileUrl: { type: String },

      type: {
        type: String,
        enum: ["text", "image", "file"],
        default: "text",
      },

      isRead: { type: Boolean },
    },

    {
      timestamps: true,
    },
  );

  schema.index({ sender: 1, receiver: 1 });
  schema.index({ receiver: 1, isRead: 1 });
  schema.index({ createdAt: 1 });

  const model = mongoose.model("SocketChat", schema, "SocketChat");
  return model;
};

export const DBSocketNotify = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBSocketNotify>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      type: { type: String },
      title: { type: String },
      content: { type: String },
      isRead: { type: Boolean },
      display: { type: Number, default: 0 },
    },
    {
      timestamps: true,
    },
  );

  const model = mongoose.model("SocketNotify", schema, "SocketNotify");
  return model;
};
