import { Get, Injectable, Param } from '@nestjs/common';
import {tasksModel, taskStatus} from './tasks.model';
import { createTaskDto } from './create-task.dto';
import { updateTaskDto } from './update-task.dto';
import {invalidStatusException} from './Exception/invalidStatus.exception';

@Injectable()
export class TasksService {

    public tasks:tasksModel[] = [];


    public findAllTasks():tasksModel[] 
    {
        return this.tasks;
    }

    public findTaskById(id: string): tasksModel | undefined 
    {
        console.log(typeof id);
        return this.tasks.find(task => task.id === parseInt(id));
    }

    public createTask(createTaskDto : createTaskDto) {
        const task: tasksModel = {
            id : this.tasks.length + 1,
            ...createTaskDto
        };
        this.tasks.push(task);

        console.log("Task created successfully");
        return task;
    }

    public updateTaskStatus(id: string, status: string) {
        console.log(typeof id);
        const task = this.findTaskById(id);
        if(task){
            task.status = status as any;
            return task;
        }
        return null;
    }

    public deleteTask(id: string) {
        const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id));
        if(taskIndex !== -1){
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }

    public updateTask(id : string, updateTaskDto : updateTaskDto) {
        const task = this.findTaskById(id);

        if(task && !this.isStatusValid(task.status, updateTaskDto.status)) {
            return new invalidStatusException();
        }

        if(task){
            task.title = updateTaskDto.title;
            task.description = updateTaskDto.description;
            task.status = updateTaskDto.status;
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
