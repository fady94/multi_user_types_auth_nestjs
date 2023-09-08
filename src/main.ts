import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Offer Hub')
    .setDescription('Offers Hub Api Description')
    .setVersion('1.0')
    .addTag('OfferHub')
    .build();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
