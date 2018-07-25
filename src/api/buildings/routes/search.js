import Building from '../model'

export default async function search (req, res, next) {
  try {
    // exclude MongoDB's _id and __v fields
    const docs = await Building
      .find({ $text: { $search: req.query.q } }, '-_id -__v')
      .limit(req.query.limit)
      .skip(req.query.offset)
      .sort(req.query.sort)
      .exec()
    res.json(docs)
  } catch (ex) {
    return next(ex)
  }
}
