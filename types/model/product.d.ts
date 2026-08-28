import { Types } from "mongoose";

export interface IDBProduct {
  _id: Types.ObjectId;

  name: string;
  image: string;
  price: number;
  status: boolean;
  type: number;

  createdAt: Date;
  updatedAt: Date;
}
export interface IDBOrder {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  user: Types.ObjectId;
  profit: string;
  code: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDBProductFreeze {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  user: Types.ObjectId;
  status: number;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}
