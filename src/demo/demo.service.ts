import { Injectable } from '@nestjs/common';
import { JsonServerService } from 'src/json-server/json-server.service';
import { SalesforceService } from 'src/salesforce/salesforce.service';
import { SftpService } from 'src/sftp/sftp.service';

@Injectable()
export class DemoService {
  constructor(
    private readonly salesforce: SalesforceService,
    private readonly sftp: SftpService,
    private readonly jsonServer: JsonServerService,
  ) {}

  async execute() {
    await Promise.all([this.salesforce.doConnect(), this.sftp.doConnect()]);
    const soqlQuery = this.salesforce
      .newQuery()
      .select('Name', 'CreatedDate')
      .from('Account')
      .orderBy('Name ASC')
      .setLimit(10)
      .build();

    const accounts = await this.salesforce.getRecords(soqlQuery);
    const files = await this.sftp.listFiles('/', '.csv');
    const todos = await this.jsonServer.findAll();
    return {
      accounts,
      files,
      todos,
    };
  }
}
