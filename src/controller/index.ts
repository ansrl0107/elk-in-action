import { RequestHandler } from 'express'
import { DatabaseService } from '../repository'

import { nanoid } from 'nanoid'

const healthCheck: RequestHandler = async (req, res) => {
  return res.status(200).json()
}

/**
 * @endpoint POST /short-links
 */
const createShortLinks: RequestHandler = async (req, res) => {
  const { url } = req.body

  if (typeof url !== 'string') return res.status(400).json({ message: 'invalid input' })

  const db = await DatabaseService.getInstance()
  
  const shortId = nanoid(6)

  const shortenUrl = `${req.protocol}://${req.headers.host}/s/${shortId}`

  await db.shortenUrl.insert({ originalUrl: url, shortId })

  return res.status(200).json({ url, shortenUrl })
}


/**
 * @endpoint GET /s/:shortId
 */
const redirectShortenUrl: RequestHandler = async (req, res) => {
  const { shortId } = req.params  

  const db = await DatabaseService.getInstance()

  const shortenUrl = await db.shortenUrl.findOne({ shortId })

  if (!shortenUrl) return res.status(400).json({ message: 'invalid shorten url' })

  await db.accessLog.insert({ shortenUrl })

  return res.redirect(shortenUrl.originalUrl)
}

const getAccessLogs: RequestHandler = async (req, res) => {
  const { limit: strLimit = '100', offset: strOffset = '0' } = req.query

  if (typeof strLimit !== 'string' || typeof strOffset !== 'string') return res.status(400).json({ message: 'invalid query parameters' })

  const limit = parseInt(strLimit, 10)
  const offset = parseInt(strOffset, 10)

  const db = await DatabaseService.getInstance()

  const [logs, totalCount] = await db.accessLog.findAndCount({
    relations: ['shortenUrl'],
    skip: offset * limit,
    take: limit,
    order: { createdAt: 'DESC' }
  })

  return res.status(200).json({ totalCount, items: logs })
}

export { redirectShortenUrl, createShortLinks, getAccessLogs, healthCheck }
