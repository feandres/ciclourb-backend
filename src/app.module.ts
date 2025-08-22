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
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT', 5432), // Valor padrão
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production', // Evitar synchronize em produção
        ssl: {
          rejectUnauthorized: false, // Necessário para o Supabase
        },
        retryAttempts: 3, // Tentativas de reconexão
        retryDelay: 3000, // Atraso entre tentativas (ms)
        logging: config.get<string>('NODE_ENV') !== 'production', // Ativar logs apenas em dev
      }),
    }),
    Zonas30Module,
    BicicletarModule,
    MalhaAtualModule,
    MalhaPDCIModule,
    ContagemModule,
    DadosModule,
  ],
})
export class AppModule {}