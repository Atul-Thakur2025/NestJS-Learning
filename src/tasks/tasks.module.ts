import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports : [TypeOrmModule.forFeature([Task, User])], //register Task and User entities with TypeOrmModule to use them in the TasksService
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {};
