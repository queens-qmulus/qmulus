import mongoose from 'mongoose'

const Schema = mongoose.Schema

const sectionSchema = new Schema({
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
    _id: false,
    section_name: String,
    section_type: String,
    section_number: String,
    class_number: Number,
    dates: [{
      _id: false,
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
})

export default mongoose.model('sections', sectionSchema)
