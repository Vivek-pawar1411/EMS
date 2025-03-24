import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './auth.role.guard';

@Module({

    providers: [AuthGuard, RoleGuard],
    exports: [AuthGuard, RoleGuard],

})
export class AuthModule {}

