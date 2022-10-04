import { Module } from '@nestjs/common';
import { PrivilageService } from './privilage.service';
import { PrivilageController } from './privilage.controller';
import { PrivilageProviders } from './privilage.providers';
import { SystemModule } from '../system/system.module';
import { ResourceModule } from '../resource/resource.module';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule, SystemModule, ResourceModule],
  controllers: [PrivilageController],
  providers: [PrivilageService, ...PrivilageProviders]
})
export class PrivilageModule { }
