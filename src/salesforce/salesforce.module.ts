import { Module } from '@nestjs/common';
import { SalesforceService } from './salesforce.service';
import { SalesforceApi } from './salesforce.api';

@Module({
  providers: [SalesforceService, SalesforceApi],
})
export class SalesforceModule {}
