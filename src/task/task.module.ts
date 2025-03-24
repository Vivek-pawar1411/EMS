import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [TaskService,DatabaseService],
  controllers: [TaskController]
})
export class TaskModule {
  
}
