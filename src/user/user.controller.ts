import { Controller, Post, Get, Body, UseGuards, Param, Delete,Patch, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/auth.role.guard';
import { Role } from 'src/auth/auth.role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() body: { name: string, email: string, password: string, role: string }) {
        const { name, email, password, role } = body;
        return this.userService.register(name, email, password, role);
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const { email, password } = body;
        const result = this.userService.login(email, password);
        return result;
    }


    @Get('getall')
    @UseGuards(AuthGuard, RoleGuard)
    @Role('admin')
    async getall() {
        return this.userService.getall();
    }



    @Get('getbyid/:id')
    @UseGuards(AuthGuard)
    async getbyid(@Param() Param: { id: number }) {
        const { id } = Param;
        return this.userService.getbyid(id);
    }


//delete by id
    @Delete('deletebyid/:id')
    async deletebyid(@Param() Param: { id: number }) {
        const { id } = Param;

        return this.userService.deletebyid(id);
        
    }


    //update name and email

    @Patch('update/:id')
    async updatebyid(@Param() Param:({id:string}),@Body() body: { name: string, email: string }) {
        const { id } = Param;
        const { name, email } = body;
        return this.userService.update(parseInt(id), name, email);
    }
     
 //newly added
    @Put('updateall/:id')
    async updateall (@Param() param:({id:string}), @Body() body:{name:string,email:string,password:string,role:string}){
        const  {id}=param;
        const{name,email,password,role}=body
        return this.userService.updateall(parseInt(id),name,email,password,role);
    }






  


}






