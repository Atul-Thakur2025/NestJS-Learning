import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {tasksModel} from './tasks.model';
import { createTaskDto } from './create-task.dto';
import { updateTaskDto,updateTaskStatusDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService){};

    @Get()
    public findAllTasks() : tasksModel[] 
    {
        return this.tasksService.findAllTasks();
    }

    @Get(':id')
    public findTaskById(@Param('id') id: string) : tasksModel | undefined 
    {
        const taks = this.tasksService.findTaskById(id);
        if(taks){
            return taks;
        }

        throw new NotFoundException();
    }

    @Post()
    public createTask(@Body() createTaskDto : createTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    public updateTaskStatus(
        @Param('id') id: string, 
        @Body() updateTaskStatusDto : updateTaskStatusDto
    ) {
        const updateTaskStatus = this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
        if(updateTaskStatus){
            return updateTaskStatus;
        }
        throw new NotFoundException();
    }

    @Put('/:id')
    public updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto : updateTaskDto
    )
    {
        const updatedTask = this.tasksService.updateTask(id, updateTaskDto);
        if(updatedTask){
            return updatedTask;
        }
        throw new NotFoundException();
    }

    @Delete('/:id')
    public deleteTaks(@Param('id') id : string)
    {
        const isDeleted = this.tasksService.deleteTask(id);
        if(isDeleted){
            return {message : "Task deleted successfully"};
        }
        throw new NotFoundException();
    }

}
