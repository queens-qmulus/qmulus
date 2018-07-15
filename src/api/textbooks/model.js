import mongoose from 'mongoose'

const Schema = mongoose.Schema

const textbookSchema = new Schema({
  isbn_10: String,
  isbn_13: String,
  title: String,
  authors: [String],
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

// TODO: add => authors: 'text'
textbookSchema.index({isbn_10: 'text', isbn_13: 'text'})

export default mongoose.model('textbooks', textbookSchema)
