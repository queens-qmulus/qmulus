import mongoose from 'mongoose'

const Schema = mongoose.Schema
const departmentSchema = new Schema({ code: String, name: String })

export default mongoose.model('departments', departmentSchema)
