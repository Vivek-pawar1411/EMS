// sample/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { RoleGuard} from './auth/auth.role.guard';
import { MulterModule } from '@nestjs/platform-express';
import { TaskModule } from './task/task.module';



@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TaskModule,],
   
    
  
  
  controllers: [AppController],
  providers: [AppService, AuthGuard,RoleGuard],
})
export class AppModule {}
