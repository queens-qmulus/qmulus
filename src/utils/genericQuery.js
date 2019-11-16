
const createGenericQueryParser = (MongooseModel) => async (req, res, next) => {
  const { limit, offset, sort, token, ...rest } = req.query
  try {
    const docs = await MongooseModel.find(rest, '-_id -__v')
      .limit(req.query.limit)
      .skip(req.query.offset)
      .sort(req.query.sort)
      .exec()
    res.json(docs)
  } catch (ex) {
    return next(ex)
  }
}

export { createGenericQueryParser }
