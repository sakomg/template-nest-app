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
    const accounts = await this.salesforce.getRecordsByQuery('SELECT Id, Name FROM Account');
    const files = await this.sftp.listFiles('/', '.csv');
    const todos = await this.jsonServer.findAll();
    return {
      accounts,
      files,
      todos,
    };
  }
}
