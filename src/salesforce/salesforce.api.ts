import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Parser } from '@json2csv/plainjs';
import {
  BatchResultInfo,
  BulkLoadOperation,
  BulkOptions,
  Connection,
  DescribeSObjectResult,
  RecordResult,
  UserInfo,
} from 'jsforce';

@Injectable()
export class SalesforceApi {
  private connect: Connection;
  private login: UserInfo;
  constructor(private readonly config: ConfigService) {}

  public get isLogin() {
    return Boolean(this.login);
  }

  async loginViaOAUTH2() {
    this.connect = new Connection({
      oauth2: {
        loginUrl: this.config.get('SF_INSTANCE_URL'),
        clientId: this.config.get('SF_CLIENT_ID'),
        clientSecret: this.config.get('SF_CLIENT_SECRET'),
        redirectUri: this.config.get('SF_REDIRECT_URI'),
      },
    });

    await this.connect.login(
      this.config.get('SF_USERNAME'),
      this.config.get('SF_PASSWORD'),
      async (err: Error, info: UserInfo) => {
        if (err) {
          console.log('❌ error login', err);
        } else {
          console.log('✅ success login to salesforce');
          this.login = info;
        }
      },
    );
  }

  async fetchObjectDescribe(objectName: string): Promise<DescribeSObjectResult> {
    return new Promise((res, rej) => {
      this.connect.sobject(objectName).describe((err: Error, metadata: DescribeSObjectResult) => {
        if (err) {
          console.error(err);
          rej(err);
        }
        res(metadata);
      });
    });
  }

  async fetchAllRecords(query: string): Promise<Array<any>> {
    if (!query && !query.length) return;
    let records: Array<any> = [];

    const result = await this.connect.query(query.trim());
    records = records.concat(result.records);

    if (!result.done) {
      let nextRecordsUrl = result.nextRecordsUrl;

      while (nextRecordsUrl) {
        const moreResult = await this.connect.queryMore(nextRecordsUrl);
        records = records.concat(moreResult.records);
        nextRecordsUrl = moreResult.nextRecordsUrl;
      }
    }

    return records;
  }

  async insertRecord(sobject: string, record: any) {
    return new Promise((res, rej) => {
      this.connect.sobject(sobject).create(record, (err: any, ret: any) => {
        if (err || !ret.success) {
          console.error(err);
          rej(err);
        }
        res(ret.id);
      });
    });
  }

  async bulkUpsert(sObjectName: string, externalId: BulkOptions, data: string | Array<any>) {
    this.connect.bulk.pollTimeout = Number.MAX_VALUE;
    const operation: BulkLoadOperation = 'upsert';
    this.connect.bulk.load(sObjectName, operation, externalId, data, (err: Error, res: RecordResult[] | BatchResultInfo[]) => {
      this.handleLoadResult(err, res);
    });
  }

  handleLoadResult(err: Error, res: any[]) {
    const errorResult = [];
    if (err) {
      console.error('error in bulk load', err);
      // log error in sf
    } else {
      for (let i = 0; i < res.length; i++) {
        if (!res[i].success) {
          console.error(`#${i + 1} error occurred, message = ${res[i].errors.join(',')}`);
          errorResult.push(res[i].errors.join(','));
        }
      }

      if (errorResult.length) {
        // log errors in sf
      }
    }
  }

  async upsertRecords(records: Array<any>, object: string, externalId: BulkOptions) {
    const parser = new Parser();
    const csv = parser.parse(records);
    await this.bulkUpsert(object, externalId, csv);
  }
}
