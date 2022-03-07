import { IsInt, IsString } from "class-validator";

export class CreateTodoDto {
    @IsInt()
    userId: number;

    @IsString()
    task: string;
}
