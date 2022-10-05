import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleProviders } from './role.providers';
import { DatabaseModule } from '@/common/database/database.module';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';
import { SystemModule } from '../system/system.module';
import { PrivilageModule } from '../privilege/privilege.module';

@Module({
  imports: [DatabaseModule, RolePrivilegeModule, SystemModule, PrivilageModule],
  controllers: [RoleController],
  providers: [RoleService, ...RoleProviders],
  exports: [RoleService],
})
export class RoleModule { }
