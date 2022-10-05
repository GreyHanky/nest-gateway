import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { DatabaseModule } from '@/common/database/database.module';
import { rolePrivilegeProviders } from './role-privilege.providers';

@Module({
  imports: [DatabaseModule],
  providers: [RolePrivilegeService, ...rolePrivilegeProviders],
  exports: [RolePrivilegeService]
})
export class RolePrivilegeModule { }
