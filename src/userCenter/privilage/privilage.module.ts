import { Module } from '@nestjs/common';
import { PrivilageService } from './privilage.service';
import { PrivilageController } from './privilage.controller';
import { PrivilageProviders } from './privilage.providers';

@Module({
  controllers: [PrivilageController],
  providers: [PrivilageService, ...PrivilageProviders]
})
export class PrivilageModule { }
