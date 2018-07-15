import mongoose from 'mongoose'

const Schema = mongoose.Schema

const courseSchema = new Schema({
  department: String,
  course_code: String,
  course_name: String,
  campus: String,
  description: String,
  grading_basis: String,
  course_components: {type: Map, of: String}, // handles arbitrary keys
  requirements: String,
  add_consent: String,
  drop_consent: String,
  academic_level: String,
  academic_group: String,
  academic_org: String,
  units: Number,
  CEAB: {
    math: Number,
    basic_sci: Number,
    comp_st: Number,
    eng_sci: Number,
    end_des: Number,
  },
})

// Support indexing for more efficient MongoDB lookups
courseSchema.index({
  department: 'text',
  course_code: 'text',
  course_name: 'text',
  campus: 'text',
  academic_level: 'text',
  units: 'text',
})

export default mongoose.model('courses', courseSchema)
