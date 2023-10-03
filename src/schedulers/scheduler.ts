import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Service } from './service';

@Injectable()
export class Scheduler {
  constructor(private readonly service: Service) {}

  @Timeout(1000)
  async handleExtract() {
    console.log('🚀 scheduler triggered on', new Date().toLocaleTimeString());
    try {
      this.service.execute();
    } catch (error) {
      console.log('error during start process', JSON.stringify(error));
    }
  }
}
