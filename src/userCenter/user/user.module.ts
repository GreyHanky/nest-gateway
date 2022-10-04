import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';
import { SystemModule } from '../system/system.module';
import { ResourceModule } from '../resource/resource.module';

@Module({
  imports: [DatabaseModule, SystemModule,ResourceModule],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService, FeishuService],
})
export class UserModule { }
