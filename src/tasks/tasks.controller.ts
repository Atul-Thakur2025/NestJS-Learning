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
    public async findAllTasks() : Promise<tasksModel[]> 
    {
        return await this.tasksService.findAllTasks();
    }

    @Get(':id')
    public async findTaskById(@Param('id') id: string) : Promise<tasksModel | null> 
    {
        const taks = await this.tasksService.findTaskById(id);
        if(taks){
            return taks;
        }

        throw new NotFoundException();
    }

    @Post()
    public async createTask(@Body() createTaskDto : createTaskDto) {
        return await this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    public async updateTaskStatus(
        @Param('id') id: string, 
        @Body() updateTaskStatusDto : updateTaskStatusDto
    ) {
        const updateTaskStatus = await this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
        if(updateTaskStatus){
            return updateTaskStatus;
        }
        throw new NotFoundException();
    }

    @Put('/:id')
    public async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto : updateTaskDto
    )
    {
        const updatedTask = await this.tasksService.updateTask(id, updateTaskDto);
        if(updatedTask){
            return updatedTask;
        }
        throw new NotFoundException();
    }

    @Delete('/:id')
    public async deleteTaks(@Param('id') id : string)
    {
        const isDeleted = await this.tasksService.deleteTask(id);
        if(isDeleted){
            return {message : "Task deleted successfully"};
        }
        throw new NotFoundException();
    }

}
