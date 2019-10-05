import mongoose from 'mongoose'

const Schema = mongoose.Schema

const textbookSchema = new Schema({
  id: String,
  isbn_10: String,
  isbn_13: String,
  title: String,
  authors: { type: [String], index: true },
  image: String,
  price_new: Number,
  price_used: Number,
  status: String,
  courses: [{
    _id: false,
    year: String,
    term: String,
    department: String,
    course_code: String,
    url: String,
    instructor: String,
  }],
})

textbookSchema.index({
  id: 'text',
  authors: 'text',
  title: 'text',
})

export default mongoose.model('textbooks', textbookSchema)
