import type { Mongoose } from 'mongoose'
import { IDBConfig } from '~~/types/model/config'

export const DBConfig = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBConfig>({ 
    name: { type: String, default: 'Graff | INT Official Website | The Most Fabulous Jewels in the World' },
    short_name: { type: String, default: 'Graff' },
    description: { type: String, default: 'Graff | INT Official Website | The Most Fabulous Jewels in the World' },
    og_image: { type: String },
    logo_image: { type: String },
    logo_long_image: { type: String },
    makeby: { type: String, default: 'Chun Dev' },
    about: { type: String },
    privacy: { type: String },
    terms: { type: String },
  }, {
    timestamps: true
  })

  const model = mongoose.model('Config', schema, 'Config')

  const autoCreate = async () => {
    const count = await model.countDocuments({})
    if(count == 0) return await model.create({})
  }

  autoCreate()
  return model 
}

