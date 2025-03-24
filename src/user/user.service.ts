import { Injectable,BadRequestException,InternalServerErrorException} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
   
    constructor(private readonly DatabaseService: DatabaseService) { }

async register(name: string, email: string, password: string, role: string) {
       const existuser = await this.DatabaseService.query(
        'SELECT * FROM users WHERE email = ?',[email]);

        if(existuser.length > 0) {
            return { message: "User Already Exists" };
        }
        const result = await this.DatabaseService.query(
            'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)',
            [name,email,password,role],
        );
        return { message: "User Registered  Successfully", result };
        } 

   async getall() {
        const result = await this.DatabaseService.query('SELECT * FROM users', []);
        return result;
    }

 async login(email: string, password: string) {
        const result = await this.DatabaseService.query(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password],
        );
        if (!result.length) {
            return { message: 'Invalid credentials' };
          }
      
          const user = result[0];
          const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'super_key',
            { expiresIn: '24h' }
          );
      
          return { message: 'Login successful', token, user:{ id:user.id,name:user.name,role:user.role} };
        }


        async getbyid(id: number) {
            const result = await this.DatabaseService.query(
                'SELECT id,name,email,role,joined_at FROM users WHERE id = ?',
                [id],
            );
            return result;
        }


        async deletebyid(id:number){
            const result =await this.DatabaseService.query(
                'DELETE from users where id=?',
                [id] );

            if (result.affected === 0) {
                throw new BadRequestException('User not found');
              } else{
                return { message: 'User deleted successfully' };
              }
           
        }
        
       
        }
        



