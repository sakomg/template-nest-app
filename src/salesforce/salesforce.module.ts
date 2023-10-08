import { Module } from '@nestjs/common';
import { SalesforceApi } from './salesforce.api';
import { SalesforceService } from './salesforce.service';
import { SoqlBuilder } from './salesforce.soql-builder';

@Module({
  providers: [SalesforceApi, SalesforceService, SoqlBuilder],
  exports: [SalesforceService],
})
export class SalesforceModule {}
