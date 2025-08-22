import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dns from 'dns';

async function bootstrap() {
  dns.setDefaultResultOrder('ipv4first');
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App rodando na porta ${port}`);
}

bootstrap();
