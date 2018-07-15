import express from 'express'

import Textbook from './model'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    // exclude MongoDB's _id and __v fields
    const docs = await Textbook.find({}, '-_id -__v').exec()
    res.json(docs)
  } catch (ex) {
    return next(ex)
  }
})

export default router
