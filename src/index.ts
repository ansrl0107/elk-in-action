import express from 'express'
import elasticApm from 'elastic-apm-node'
import { redirectShortenUrl, createShortLinks, getAccessLogs, healthCheck } from './controller'

const apm = elasticApm.start()

const app = express()

app.use(express.json())

app.get('/', healthCheck)
app.get('/s/:shortId', redirectShortenUrl)
app.post('/short-links', createShortLinks)
app.get('/access-logs', getAccessLogs)

app.listen(process.env.PORT)