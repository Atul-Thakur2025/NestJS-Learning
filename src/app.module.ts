import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyService } from './dummy/dummy.service';
import { MassegeFormaterService } from './massege-formater/massege-formater.service';
import { LogsService } from './logs/logs.service';
import { TasksModule } from './tasks/tasks.module';
import {ConfigModule} from '@nestjs/config';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load : [appConfig],
      isGlobal : true
    }),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService, DummyService, MassegeFormaterService, LogsService],
})
export class AppModule {}

