import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphModule } from 'nestjs-graph';

async function bootstrap() {
  const PORT = process.env.PORT || 5002;
  const app = await NestFactory.create(AppModule);
  new GraphModule(app).serve('/graph', app.getHttpAdapter());
  await app.listen(PORT, () => console.log(`🎬 started on port ${PORT}`));
}
bootstrap();
