import { Injectable } from '@nestjs/common';
import { SalesforceApi } from './salesforce.api';

@Injectable()
export class SalesforceService {
  constructor(private readonly api: SalesforceApi) {}

  async doConnect() {
    await this.api.loginViaOAUTH2();
  }

  async getRecords(sObjectName: string, fields: Array<string>, additionalClause: string) {
    const records = await this.api.fetchAllRecords(`
      SELECT ${fields.join(', ')} 
      FROM ${sObjectName} 
      ${additionalClause}
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
    await this.api.insertRecord(sObjectName, record);
  }
}
