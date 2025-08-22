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

  // Configurar CORS para permitir o frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', // Substitua pelo domínio do seu frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  });

  app.setGlobalPrefix('api');
  await app.init();
  return expressInstance;
}

// Exportar a função serverless para o Vercel
export default async function handler(req: any, res: any) {
  const server = await createNestServer(expressServer);
  return server(req, res);
}