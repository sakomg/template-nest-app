import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(private readonly service: DemoService) {}

  @Get(':id')
  getOne(@Param() params: any): any {
    return {
      id: params.id,
    };
  }

  @Get()
  async getAll() {
    const result = await this.service.execute();
    return result;
  }

  @Post('/start')
  @HttpCode(200)
  execute() {
    this.service.execute();
    return {
      message: 'started',
      at: new Date().toISOString(),
    };
  }
}
