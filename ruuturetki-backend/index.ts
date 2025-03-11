import app from './app.ts';
import { env } from './env.ts'
import { log_info } from './utils/logger.ts'

app.listen(env.PORT, () => {
  log_info(`Server running on port ${env.PORT}`)
})
