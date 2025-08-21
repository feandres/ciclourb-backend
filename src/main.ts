import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

let app: NestExpressApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    app.enableCors({
      origin: true, 
      credentials: true,
    });

    app.setGlobalPrefix('api');
    
    await app.init();
  }
  return app;
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(async (app) => {
    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
  });
}

export default async (req: any, res: any) => {
  const server = await bootstrap();
  return server.getHttpAdapter().getInstance()(req, res);
};