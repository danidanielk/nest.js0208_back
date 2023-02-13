import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(`application running on port : ${port} started.`);
  // app.useStaticAssets(join(__dirname, './common', 'uploads'), {
  //   prefix: '/media',
  // });
}
bootstrap();
