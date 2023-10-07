import { Module } from '@nestjs/common';
import { JsonServerService } from './json-server.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [JsonServerService],
  exports: [JsonServerService],
  imports: [HttpModule],
})
export class JsonServerModule {}
