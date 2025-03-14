import app from './app.js'
import { env } from './env.js'
import { log_info } from './utils/logger.js'

app.listen(env.PORT, () => {
  log_info(`Server running on port ${env.PORT}`)
})
