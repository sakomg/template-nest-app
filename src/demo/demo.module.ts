import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { DemoScheduler } from './demo.scheduler';
import { SalesforceModule } from 'src/salesforce/salesforce.module';
import { SftpModule } from 'src/sftp/sftp.module';

@Module({
  providers: [DemoService, DemoScheduler],
  controllers: [DemoController],
  imports: [SalesforceModule, SftpModule],
})
export class DemoModule {}
