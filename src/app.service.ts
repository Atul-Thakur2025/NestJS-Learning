import { Injectable } from '@nestjs/common';
import { DummyService } from './dummy/dummy.service';
import { LogsService } from './logs/logs.service';
import { ConfigService } from '@nestjs/config';
import { configType } from './config/config.types';

@Injectable()
export class AppService {

  constructor(
    private readonly dummyService : DummyService, 
    private readonly logsService : LogsService,
    private readonly ConfigService : ConfigService<configType>
  ){
    //nothing to do here
  }


  getHello(): string {
    const messagePrefix = this.ConfigService.get('app').message_prefix;
    return `${messagePrefix} Hello World! ${this.dummyService.work()}`;
  }

  printHello(): void{
    this.logsService.log(this.getHello());
  }
}


