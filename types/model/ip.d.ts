import { Types } from "mongoose";

export interface IDBAdminIP {
  _id: Types.ObjectId;

  ip: string;
}