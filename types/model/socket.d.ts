import type { Types } from 'mongoose'


export interface IDBSocketOnline {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  socket: string
  user: Types.ObjectId
}

export interface IDBSocketChat {
  _id: Types.ObjectId;

  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  
  message: string;

  type: "text" | "image" | "file";
  fileUrl?: string;
  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface IDBSocketNotify{
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  user: Types.ObjectId;
  type: string
  title: string
  content: string
  isRead: boolean
  display: number
}
