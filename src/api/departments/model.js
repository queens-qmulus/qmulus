import mongoose from 'mongoose'

const Schema = mongoose.Schema
const departmentSchema = new Schema({
  // Exclude MongoDB's _id and __v fields.
  _id: { type: String, select: false },
  __v: { type: Number, select: false },
  code: String,
  name: String,
})

departmentSchema.index({ code: 'text', name: 'text' })

export default mongoose.model('departments', departmentSchema)
