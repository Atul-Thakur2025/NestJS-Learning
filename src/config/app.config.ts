import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app',()=>({
    message_prefix : process.env.APP_MESSAGE_PREFIX || 'Hello'
}))