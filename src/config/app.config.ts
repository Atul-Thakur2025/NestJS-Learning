import { registerAs } from '@nestjs/config';

export interface AppConfig {
  message_prefix: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    message_prefix: process.env.APP_MESSAGE_PREFIX || 'Hello',
  }),
);
