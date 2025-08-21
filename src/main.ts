import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS se necessário
  app.enableCors();

  // Para Vercel, use a porta do ambiente ou 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

// Para Vercel serverless
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Export para Vercel
export default async (req, res) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();

  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
};
