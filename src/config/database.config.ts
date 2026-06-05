import {registerAs} from '@nestjs/config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
    'database',
    (): TypeOrmModuleOptions => ({
        type : 'mysql',
        host : process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),//10 is just a radix to specify that the number is in base 10
        username : process.env.DB_USERNAME || 'root',
        password : process.env.DB_PASSWORD || '12345',
        database : process.env.DB_NAME || 'tasks',
        synchronize : true, //automatically create database tables based on entities, should be false in production to avoid data loss
    })
);