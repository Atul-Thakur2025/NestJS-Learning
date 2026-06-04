import { taskStatus,tasksModel } from "./tasks.model";
import {IsNotEmpty, IsString, IsEnum} from "class-validator";

export class createTaskDto {
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