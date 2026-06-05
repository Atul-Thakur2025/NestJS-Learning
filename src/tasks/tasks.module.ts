import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports : [TypeOrmModule.forFeature([Task])], //register Task entity with TypeOrmModule to use it in the TasksService
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {};
