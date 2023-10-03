import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SalesforceService } from 'src/salesforce/salesforce.service';
import { SftpService } from 'src/sftp/sftp.service';

@Injectable()
export class Service {
  constructor(
    private readonly sftp: SftpService,
    private readonly salesforce: SalesforceService,
    private readonly config: ConfigService,
  ) {}

  async execute() {
    await Promise.all([this.salesforce.doConnect(), this.sftp.doConnect()]);
    const accounts = await this.salesforce.getRecords('Account', ['Id', 'Name'], 'LIMIT 100');
    const files = await this.sftp.listFiles(this.config.get('SFTP_PATH'), '.csv');
    console.log(accounts);
    console.log(files);
  }
}
