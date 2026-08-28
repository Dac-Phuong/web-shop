import type { Mongoose } from "mongoose";
import { IDBAdminIP } from "~~/types";

export const DBAdminIP = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBAdminIP>(
    {
      ip: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    },
  );

  const model = mongoose.model("AdminIP", schema, "AdminIP");

  return model;
};
