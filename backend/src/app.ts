import express from 'express'
import cors from 'cors'
import { env } from './env'
import { usersRouter } from './routes/users'
import { storesRouter } from './routes/stores'
import { requestLogger } from './middleware/requestLogger'

export const app = express()

app.use(express.json())
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(requestLogger)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Haul API is running!',
  })
})

app.use('/api/users', usersRouter)
app.use('/api/stores', storesRouter)
