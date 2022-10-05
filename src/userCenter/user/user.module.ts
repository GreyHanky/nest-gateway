import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';
import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { PrivilageModule } from '../privilege/privilege.module';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';

@Module({
  imports: [DatabaseModule, RoleModule, UserRoleModule, PrivilageModule, RolePrivilegeModule],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService, FeishuService],
})
export class UserModule { }
