import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'

const app = express()

app.use(cors()).use(express.json())

app.use('/api/v1', routes)

export default app