import { Module } from '@nestjs/common';
import { SalesforceApi } from './salesforce.api';
import { SalesforceService } from './salesforce.service';

@Module({
  providers: [SalesforceApi, SalesforceService],
  exports: [SalesforceService],
})
export class SalesforceModule {}
