import { Module } from '@nestjs/common';
import { SftpService } from './sftp.service';

@Module({
  providers: [SftpService],
})
export class SftpModule {}
