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

    const soqlQuery = this.salesforce.newQuery().select('Id', 'Name', 'CreatedDate').from('Account').orderBy('Name ASC').build();
    const newAccId = await this.salesforce.insertRecord('Account', { Name: 'Demo Test #2' });

    const accounts = await this.salesforce.getRecords(soqlQuery);

    const files = await this.sftp.getListFiles('/', '');
    const content = await this.sftp.getDataByFilename('readme.txt');
    const todos = await this.jsonServer.findOneById('6');

    return {
      sf: accounts,
      sftp: { files, content },
      jsonServer: todos,
    };
  }
}
