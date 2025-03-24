import { Controller,Post,Get,Body,Param } from '@nestjs/common';
import { TaskService } from './task.service';


@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post('asign')
    async asign(@Body() body: { title: string, description: string, status: string, assigned_to: number }) {
        const { title, description, status, assigned_to } = body;
        return this.taskService.asign(title, description, status, assigned_to);
    }

    @Get('taskall')
    async taskall() {
        return this.taskService.taskall();
    }

    @Get('taskemp/:id')
    async taskemp(@Param('id') id: number) {
        return this.taskService.taskemp(id);
    }
}
