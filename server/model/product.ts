import type { Mongoose } from "mongoose";
import { IDBOrder, IDBProduct, IDBProductFreeze } from "~~/types/model/product";

export const DBProduct = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBProduct>(
    {
      name: { type: "String" },
      image: { type: "String" },
      price: { type: "Number" },
      type: { type: "Number", default: 0 },
      status: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );

  const model = mongoose.model("Product", schema, "Product");

  return model;
};

export const DBOrder = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBOrder>(
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      profit: { type: "String" },
      status: { type: "Number" },
      code: { type: "String" },
    },
    {
      timestamps: true,
    },
  );

  const model = mongoose.model("Order", schema, "Order");

  return model;
};

export const DBProductFreeze = (mongoose: Mongoose) => {
  const schema = new mongoose.Schema<IDBProductFreeze>(
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: { type: "Number" },
      number: { type: "Number" },
    },
    {
      timestamps: true,
    },
  );
  const model = mongoose.model("ProductFreeze", schema, "ProductFreeze");

  return model;
};
