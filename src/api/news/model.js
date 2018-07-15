import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newsSchema = new Schema({
  title: String,
  slug: String,
  url: String,
  published: String,
  updated: String,
  authors: [String],
  content: String,
  content_raw: String,
})

// TODO: add => authors: 'text'
newsSchema.index({slug: 'text'})

export default mongoose.model('news', newsSchema)
