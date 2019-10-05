import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingestRecordSchema = new Schema({
  startDate: Date,
  version: String, // Git version hash ingested
  datasetModules: [String],
})

ingestRecordSchema.index({
  version: 'text',
})

export default mongoose.model('ingestRecords', ingestRecordSchema)
