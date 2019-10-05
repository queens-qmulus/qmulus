import mongoose from 'mongoose'

const Schema = mongoose.Schema
const departmentSchema = new Schema({
  id: String,
  code: String,
  name: String,
})

departmentSchema.index({ id: 'text', code: 'text', name: 'text' })

export default mongoose.model('departments', departmentSchema)
