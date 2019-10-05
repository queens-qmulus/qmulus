import IngestRecord from './model'

export async function getLastIngest () {
  const doc = await IngestRecord.find().sort({ _id: -1 }).limit(1).exec()
  return doc && doc[0]
}

export async function saveIngestRecord (metadata) {
  if (!metadata.version) {
    return
  }

  return IngestRecord.create({
    startDate: metadata.startDate,
    version: metadata.version,
    datasetModules: Object.keys(metadata.datasetModules),
  })
}
