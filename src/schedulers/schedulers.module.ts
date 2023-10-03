import { Module } from '@nestjs/common';
import { Service } from './service';
import { Scheduler } from './scheduler';
import { SftpService } from 'src/sftp/sftp.service';
import { SalesforceService } from 'src/salesforce/salesforce.service';
import { SalesforceApi } from 'src/salesforce/salesforce.api';

@Module({
  providers: [Service, Scheduler, SftpService, SalesforceService, SalesforceApi],
})
export class SchedulersModule {}
