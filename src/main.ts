import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';

const expressServer: Express = express();

async function createNestServer(expressInstance: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors();
  app.setGlobalPrefix('api'); 

  return app.init();
}

// Para produção no Vercel
createNestServer(expressServer);

// Exporta o servidor express para o Vercel
export default expressServer;
