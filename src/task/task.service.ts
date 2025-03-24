import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';



@Injectable()
export class TaskService {

    constructor(private readonly DatabaseService: DatabaseService) { }

    async asign(title:string,description:string,status:string,assigned_to:number)
    {
        const result =await this.DatabaseService.query(
            'INSERT INTO tasks (title,description,status,assigned_to) VALUES (?,?,?,?)',
            [title,description,status,assigned_to],
        );
        return { message: "Task Assigned Successfully", result };
    }
    
    async taskall() {
        const result = await this.DatabaseService.query('SELECT * FROM tasks', []);
        return result;
    }

    async taskemp(id: number) {
        const result = await this.DatabaseService.query(
            'SELECT t.id as task_id,t.title as title ,t.description,t.status,u.name,u.id,t.assigned_at FROM tasks t inner join users u  on u.id=t.assigned_to  WHERE u.id = ?',
            [id],
        );
        return result;
    }
}
