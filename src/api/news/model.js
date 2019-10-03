import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newsSchema = new Schema({
  // Exclude MongoDB's _id and __v fields.
  _id: { type: String, select: false },
  __v: { type: Number, select: false },
  title: String,
  slug: String,
  url: String,
  published: String,
  updated: String,
  authors: { type: [String], index: true },
  content: String,
  content_raw: String,
})

newsSchema.index({
  slug: 'text',
  authors: 'text',
  published: 'text',
  updated: 'text',
})

export default mongoose.model('news', newsSchema)
