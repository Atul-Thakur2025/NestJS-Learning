import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,//allow only defined fieldsin the DTOs
      transform : true //automatically transform payloads to the expected types based on the DTO definitions
    })
  )
  
  //call printHello to see the logs in the console
  const appService = app.get(AppService);
  appService.printHello();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
