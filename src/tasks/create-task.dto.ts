import { optional } from "joi";
import { taskStatus,tasksModel } from "./tasks.model";
import {IsNotEmpty, IsString, IsEnum, IsEmpty} from "class-validator";

export class createTaskDto {

    @IsEmpty()
    id?: number;

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