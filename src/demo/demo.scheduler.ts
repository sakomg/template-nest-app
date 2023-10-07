import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { DemoService } from './demo.service';

@Injectable()
export class DemoScheduler {
  constructor(private readonly service: DemoService) {}

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
