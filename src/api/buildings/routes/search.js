import Building from '../model'

export default async function search (req, res, next) {
  try {
    const docs = await Building
      .find({ $text: { $search: req.query.q } })
      .limit(req.query.limit)
      .skip(req.query.offset)
      .sort(req.query.sort)
      .exec()
    res.json(docs)
  } catch (ex) {
    return next(ex)
  }
}
