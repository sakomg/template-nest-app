import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SalesforceModule } from './salesforce/salesforce.module';
import { ScheduleModule } from '@nestjs/schedule';
import { configuration } from 'config/configuration';
import { validationSchema } from 'config/validation';
import { SftpModule } from './sftp/sftp.module';
import { SchedulersModule } from './schedulers/schedulers.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    SftpModule,
    SalesforceModule,
    SchedulersModule,
  ],
})
export class AppModule {}
