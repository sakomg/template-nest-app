import { Injectable } from '@nestjs/common';
import { SalesforceService } from 'src/salesforce/salesforce.service';
import { SftpService } from 'src/sftp/sftp.service';

@Injectable()
export class DemoService {
  constructor(private readonly salesforce: SalesforceService, private readonly sftp: SftpService) {}

  async execute() {
    await Promise.all([this.salesforce.doConnect(), this.sftp.doConnect()]);
    const accounts = await this.salesforce.getRecordsByOptions({
      fields: ['Id', 'Name'],
      from: 'Account',
    });
    const files = await this.sftp.listFiles('/FFUN/Dealervu/', '.csv');
    console.log('accounts', accounts.length);
    console.log('files', files.length);

    return {
      files,
    };
  }
}
