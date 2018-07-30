import Section from '../model'

export default async function list (req, res, next) {
  try {
    // exclude MongoDB's _id and __v fields
    const docs = await Section.find({})
      .limit(req.query.limit)
      .skip(req.query.offset)
      .sort(req.query.sort)
      .exec()
    res.json(docs)
  } catch (ex) {
    return next(ex)
  }
}
