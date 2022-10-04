import { Module } from '@nestjs/common';
import { PrivilageService } from './privilege.service';
import { PrivilageController } from './privilege.controller';
import { PrivilageProviders } from './privilege.providers';
import { SystemModule } from '../system/system.module';
import { ResourceModule } from '../resource/resource.module';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule, SystemModule, ResourceModule],
  controllers: [PrivilageController],
  providers: [PrivilageService, ...PrivilageProviders]
})
export class PrivilageModule { }
