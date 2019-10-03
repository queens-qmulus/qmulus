import Textbook from '../model'

export default async function show (req, res, next) {
  try {
    const isbn13 = req.params.isbn_13
    const doc = await Textbook.findOne({ isbn_13: isbn13 }).exec()

    if (!doc) {
      const error = new Error(`Textbook with ISBN '${isbn13}' does not exist.`)
      error.status = 404
      return next(error)
    }

    res.json(doc)
  } catch (ex) {
    return next(ex)
  }
}
