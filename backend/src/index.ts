import 'dotenv/config'
import { env } from './env'
import { app } from './app'

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Haul API running on http://localhost:${env.PORT}`)
  console.log(`📝 Environment: ${env.NODE_ENV}`)
})
