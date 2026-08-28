import { Types } from 'mongoose'

export interface IAuth {
  _id: Types.ObjectId
  username: string
  type: number
}

export interface IResp {
  code? : number
  message?: string
  result?: any
  config?: any
  params?: any
}

export interface IFormatDate {
  day: number
  month: number
  year: number
  hour: number
  minute: number
  timestamp: number
  source: any
  dayjs: any
}