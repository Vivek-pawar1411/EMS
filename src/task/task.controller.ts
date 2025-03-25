import { Controller,Post,Get,Body,Param,Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/auth.role.guard';
import { Role } from 'src/auth/auth.role.decorator';


@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post('asign')
    async asign(@Body() body: { title: string, description: string, status: string, assigned_to: number }) {
        const { title, description, status, assigned_to } = body;
        return this.taskService.asign(title, description, status, assigned_to);
    }

    @Get('taskall')
    @UseGuards(AuthGuard,RoleGuard)
    @Role('admin')
    async taskall() {
        return this.taskService.taskall();
    }

    @Get('taskemp/:id')
    async taskemp(@Param('id') id: number) {
        return this.taskService.taskemp(id);
    }

    @Delete('deletetask/:id')
    
    async deletetask(@Param('id')id:number){
        return this.taskService.deletetask(id);
    }

}
