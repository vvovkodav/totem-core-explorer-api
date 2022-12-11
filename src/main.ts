import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  app.enableShutdownHooks();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Legacy API')
    .setDescription('The Legacy API gateway service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.enableCors({ origin: true });
  await app.init();
  await app.listen(config.get<string>('PORT'));
  Logger.log(`🚀 Application is running on: http://localhost:${config.get<string>('PORT')}`);
}

void bootstrap();
