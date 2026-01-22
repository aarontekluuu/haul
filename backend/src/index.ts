import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { env } from './env'
import { usersRouter } from './routes/users'
import { storesRouter } from './routes/stores'

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Haul API is running!'
  })
})

app.use('/api/users', usersRouter)
app.use('/api/stores', storesRouter)

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Haul API running on http://localhost:${env.PORT}`)
  console.log(`📝 Environment: ${env.NODE_ENV}`)
})
