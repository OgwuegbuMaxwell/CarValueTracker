import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // For security purpose. users can't add additional unexisting 
      // fields in the databse
      whitelist: true
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
