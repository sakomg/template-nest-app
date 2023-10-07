import { Injectable } from '@nestjs/common';
import { SalesforceApi } from './salesforce.api';
import { SoqlOptionsDto } from './dtos/soql-options.dto';

@Injectable()
export class SalesforceService {
  constructor(private readonly api: SalesforceApi) {}

  async doConnect() {
    await this.api.loginViaOAUTH2();
  }

  async getRecordsByQuery(query: string) {
    return await this.api.fetchAllRecords(query);
  }

  async getRecordsByOptions(soqlOptions: SoqlOptionsDto) {
    const records = await this.api.fetchAllRecords(`
      SELECT ${soqlOptions.fields.join(', ')} 
      FROM ${soqlOptions.from} 
    `);
    return records;
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
}
