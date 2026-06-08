import { Get, Injectable, Param } from '@nestjs/common';
import {tasksModel, taskStatus} from './tasks.model';
import { createTaskDto } from './create-task.dto';
import { updateTaskDto } from './update-task.dto';
import {invalidStatusException} from './Exception/invalidStatus.exception';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        public readonly tasksRepository: Repository<Task>,
        @InjectRepository(User)
        public readonly usersRepository: Repository<User>,
    ){};


    public async findAllTasks():Promise<Task[]> 
    {
        return await this.tasksRepository.find();
    }

    public async findTaskById(id: string):Promise<Task | null> 
    {
        console.log(typeof id);
        return await this.tasksRepository.findOne({ where: { id: parseInt(id) } });
    }

    public async createTask(createTaskDto : createTaskDto) : Promise<Task> {
        const task = this.tasksRepository.create(createTaskDto);
        await this.tasksRepository.save(task);

        console.log("Task created successfully");
        return task;
    }

    public async updateTaskStatus(id: string, status: string) : Promise<Task | null> {
        console.log(typeof id);
        const task = await this.tasksRepository.findOne({ where: { id: parseInt(id) } });
        if(task){
            task.status = status as taskStatus;
            await this.tasksRepository.save(task);
            return task;
        }
        return null;
    }

    public async deleteTask(id: string) : Promise<boolean> {
        const taskIndex = await this.tasksRepository.delete({ id: parseInt(id) });
        return taskIndex.affected ? true : false;
    }

    public async updateTask(id : string, updateTaskDto : updateTaskDto) : Promise<Task | null> {
        const task = await this.tasksRepository.findOne({ where: { id: parseInt(id) } });

        if(task && !this.isStatusValid(task.status, updateTaskDto.status)) {
            throw new invalidStatusException();
        }

        if(task){
            task.title = updateTaskDto.title;
            task.description = updateTaskDto.description;
            task.status = updateTaskDto.status;

            await this.tasksRepository.save(task);
            return task;
        }

        return null;
    }

    private isStatusValid(currentStatus: taskStatus, newStatus: taskStatus): boolean {
        const validStatues = [
            taskStatus.OPEN,
            taskStatus.IN_PROGRESS,
            taskStatus.DONE
        ];

        //find the incoming status index from taskStatus enum
        return validStatues.indexOf(currentStatus) <= validStatues.indexOf(newStatus);
    }

};
