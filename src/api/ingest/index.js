import express from 'express'

import { getLastIngest } from '../../db/ingestRecord'
import { getIngestManager } from '../../db'

import { validateSecret } from '../../utils/requestSecretValidator'

const router = express.Router()
const ingestManager = getIngestManager()

router.post('/start', validateSecret, async (req, res) => {
  try {
    const started = await ingestManager.startIngest()
    if (started) res.json({ status: 'ingest-started' })
    else if (ingestManager.currentIngestMetadata) {
      res.json({ status: 'ingest-in-progress' })
    }
  } catch (e) {
    res.status(500).json({ status: 500, message: 'Server Error' })
  }
})

router.post('/get-status', validateSecret, async (req, res) => {
  if (ingestManager.ongoingIngest) {
    res.json({ status: 'ingest-in-progress' })
  } else {
    res.json({ status: 'no-current-ingest' })
  }
})

router.post('/get-version', validateSecret, async (req, res) => {
  const doc = await getLastIngest()
  if (doc) {
    res.json(doc)
  } else {
    res.status(500).json({
      status: 500,
      message: 'No current version found.' +
        ' This should never happen.',
    })
  }
})

export default router
