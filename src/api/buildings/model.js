import mongoose from 'mongoose'

const Schema = mongoose.Schema

const buildingSchema = new Schema({
  // Exclude MongoDB's _id and __v fields.
  _id: { type: String, select: false },
  __v: { type: Number, select: false },
  id: String,
  code: String,
  accessibility: Boolean,
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  campus: String,
  polygon: { type: Schema.Types.Mixed, default: [] },
})

// Support indexing for more efficient MongoDB lookups
buildingSchema.index({
  address: 'text',
  campus: 'text',
  code: 'text',
  id: 'text',
  name: 'text',
})

export default mongoose.model('buildings', buildingSchema)
