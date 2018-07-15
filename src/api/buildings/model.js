import mongoose from 'mongoose'

const Schema = mongoose.Schema

const buildingSchema = new Schema({
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

// TODO: add => id: 'text'
buildingSchema.index({code: 'text', name: 'text', main: 'text'})

export default mongoose.model('buildings', buildingSchema)
