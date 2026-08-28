import type { Mongoose } from 'mongoose'
import { IDBLogAdmin, IDBLogBlockIP, IDBLogUser, IDBLogUserIP } from '~~/types'

export const DBLogAdmin = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBLogAdmin>({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String },
  }, {
    timestamps: true
  })

  schema.index({ action: 'text' })
  const model = mongoose.model('LogAdmin', schema, 'LogAdmin')
  return model
}


export const DBLogUser = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBLogUser>({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String },
    watched: { type: Boolean, default: false }
  }, {
    timestamps: true
  })

  schema.index({ action: 'text' })
  const model = mongoose.model('LogUser', schema, 'LogUser')
  return model
}

export const DBLogUserIP = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBLogUserIP>({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    ip: { type: String },
  }, {
    timestamps: true
  })

  schema.index({ ip: 'text' })
  const model = mongoose.model('LogUserIP', schema, 'LogUserIP')
  return model
}

export const DBLogBlockIP = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBLogBlockIP>({ 
    ip: { type: String },
  }, {
    timestamps: true
  })

  const model = mongoose.model('LogBlockIP', schema, 'LogBlockIP')
  return model
}