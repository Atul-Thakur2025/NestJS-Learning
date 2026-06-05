import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import { AppConfig } from "./app.config";
import joi from 'joi';

export interface configType {
    app : AppConfig,
    database : TypeOrmModuleOptions
}

export const configValidationSchema = joi.object({
    message_prefix : joi.string().optional().default('Hello from config!'),
    DB_HOST : joi.string().required().default('localhost'),
    DB_PORT : joi.string().required().default('3306'),
    DB_USERNAME : joi.string().required().default('root'),
    DB_PASSWORD : joi.string().required().default('12345'),
    DB_NAME : joi.string().required().default('tasks'),
});