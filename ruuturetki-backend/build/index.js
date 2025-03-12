import app from './app';
import { env } from './env';
import { log_info } from './utils/logger';
app.listen(env.PORT, () => {
    log_info(`Server running on port ${env.PORT}`);
});
