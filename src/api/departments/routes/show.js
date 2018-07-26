import Department from '../model'

export default async function show (req, res, next) {
  try {
    const code = req.params.code
    const doc = await Department.findOne({ code }, '-_id -__v').exec()

    if (!doc) {
      const error = new Error(`Department with code '${code}' does not exist.`)
      error.status = 404
      return next(error)
    }

    res.json(doc)
  } catch (ex) {
    return next(ex)
  }
}
