import Textbook from '../model'

export default async function list (req, res, next) {
  try {
    const docs = await Textbook.find({})
      .limit(req.query.limit)
      .skip(req.query.offset)
      .sort(req.query.sort)
      .exec()
    res.json(docs)
  } catch (ex) {
    return next(ex)
  }
}
