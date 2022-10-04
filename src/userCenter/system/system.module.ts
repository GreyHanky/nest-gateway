import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { SystemProviders } from './system.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SystemController],
  providers: [SystemService, ...SystemProviders],
  exports: [SystemService]
})
export class SystemModule { }
