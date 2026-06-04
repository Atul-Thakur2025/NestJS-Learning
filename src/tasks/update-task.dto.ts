import {taskStatus} from "./tasks.model";
import {IsNotEmpty, IsString, IsEnum} from "class-validator";

export class updateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(taskStatus)
    status : taskStatus;
}

export class updateTaskStatusDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(taskStatus)
    status : taskStatus;
}