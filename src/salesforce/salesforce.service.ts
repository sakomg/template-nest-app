import { Injectable } from '@nestjs/common';
import { SalesforceApi } from './salesforce.api';
import { SoqlBuilder } from './salesforce.soql-builder';

@Injectable()
export class SalesforceService {
  constructor(private readonly api: SalesforceApi) {}

  async doConnect() {
    await this.api.loginViaOAUTH2();
  }

  async getRecords(query: string) {
    return await this.api.fetchAllRecords(query);
  }

  async getObjectDescribe(sObjectName: string) {
    return await this.api.fetchObjectDescribe(sObjectName);
  }

  async upsertRecords(sObjectName: string, records: Array<any>, externalId: any) {
    await this.api.upsertRecords(records, sObjectName, externalId);
  }

  async insertRecord(sObjectName: string, record: object) {
    return await this.api.insertRecord(sObjectName, record);
  }

  newQuery() {
    return new SoqlBuilder();
  }
}
