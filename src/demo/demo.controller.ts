import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(private readonly service: DemoService) {}

  @Get(':id')
  findOne(@Param() params: any): any {
    console.log(params.id);
    return {
      id: params.id,
    };
  }

  @Get()
  getData() {
    return {
      test: 'test',
    };
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
