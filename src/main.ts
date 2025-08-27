import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');


import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

const expressServer = express();

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  });

  app.setGlobalPrefix('api');
  await app.init();
  return expressInstance;
}

async function handler(req: any, res: any) {
  const server = await createNestServer(expressServer);
  return server(req, res);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));
  app.enableCors();
  await app.listen(3001);
}


let serverHandler;
if (process.env.SERVER_ENV === "development") {
  serverHandler = expressServer;
  bootstrap();
} 

if (process.env.SERVER_ENV !== "development" || !process.env.SERVER_ENV) {
  serverHandler = handler;
}

export default serverHandler;
