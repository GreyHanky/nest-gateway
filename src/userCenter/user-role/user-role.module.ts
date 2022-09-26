import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleProviders } from './user-role.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserRoleService, ...UserRoleProviders],
  exports: [UserRoleService]
})
export class UserRoleModule { }
