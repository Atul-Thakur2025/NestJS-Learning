import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyService } from './dummy/dummy.service';
import { MassegeFormaterService } from './massege-formater/massege-formater.service';
import { LogsService } from './logs/logs.service';
import { TasksModule } from './tasks/tasks.module';
import {ConfigModule} from '@nestjs/config';
import { appConfig } from './config/app.config';
import {configValidationSchema, configType} from './config/config.types';
import {typeOrmConfig} from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load : [appConfig, typeOrmConfig],//load configuration from app.config and typeorm.config
      isGlobal : true,
      validationSchema : configValidationSchema,//validate env vars based on the defined schema from joi
      validationOptions:{
        //allowUnknown : true, //allow env vars that are not defined in the schema
        abortEarly : false, //report all validation errors, not just the first one
      }
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule], //import ConfigModule to use ConfigService in the factory function
      inject: [ConfigService],
      useFactory : (ConfigService : ConfigService<configType>)=>({
        ...ConfigService.get('database'),
        entities : [Task],
      })    
    }),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService, DummyService, MassegeFormaterService, LogsService],
})
export class AppModule {}
