import mongoose from 'mongoose'

const Schema = mongoose.Schema
const departmentSchema = new Schema({ code: String, name: String })

departmentSchema.index({ code: 'text', name: 'text' })

export default mongoose.model('departments', departmentSchema)
