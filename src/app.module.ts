import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Zonas30Module } from './zonas30/zonas30.module';
import { BicicletarModule } from './bicicletar/bicicletar.module';
import { MalhaAtualModule } from './malha_atual/malha_atual.module';
import { MalhaPDCIModule } from './malha_pdci/malha_pdci.module';
import { ContagemModule } from './contagem/contagem.module';
import { DadosModule } from './dados/dados.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        
        // Se DATABASE_URL existe (produção/Vercel), use ela
        if (databaseUrl) {
          console.log('Using DATABASE_URL for connection');
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: config.get<string>('NODE_ENV') !== 'production',
            ssl: { rejectUnauthorized: false },
            // Configurações específicas para serverless
            extra: {
              connectionLimit: 1,
              acquireConnectionTimeout: 30000,
              timeout: 30000,
            },
            poolSize: 1,
            retryAttempts: 3,
            retryDelay: 3000,
          };
        }
        
        // Senão, use as variáveis separadas (desenvolvimento)
        console.log('Using individual DB variables for connection');
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
          ssl: { rejectUnauthorized: false },
        };
      },
    }),
    Zonas30Module,
    BicicletarModule,
    MalhaAtualModule,
    MalhaPDCIModule,
    ContagemModule,
    DadosModule,
  ]
})
export class AppModule {}