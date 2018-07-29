import mongoose from 'mongoose'

const Schema = mongoose.Schema

const sectionSchema = new Schema({
  _id: { type: String, select: false },
  __v: { type: Number, select: false },
  id: String,
  year: String,
  term: String,
  department: String,
  course_code: String,
  course_name: String,
  units: Number,
  campus: String,
  academic_level: String,
  course_sections: [{
    _id: { type: String, select: false },
    section_name: String,
    section_type: String,
    section_number: String,
    class_number: Number,
    dates: [{
      _id: { type: String, select: false },
      day: String,
      start_time: String,
      end_time: String,
      start_date: String,
      end_date: String,
      location: String,
      instructors: { type: [String], index: true },
    }],
    combined_with: [Number],
    enrollment_capacity: Number,
    enrollment_total: Number,
    waitlist_capacity: Number,
    waitlist_total: Number,
    last_updated: String,
  }],
})

sectionSchema.index({
  department: 'text',
  course_code: 'text',
  course_name: 'text',
  instructors: 'text',
  class_number: 'text',
})

export default mongoose.model('sections', sectionSchema)
