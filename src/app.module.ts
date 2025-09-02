import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Zonas30Module } from './zonas30/zonas30.module';
import { BicicletarModule } from './bicicletar/bicicletar.module';
import { MalhaAtualModule } from './malha_atual/malha_atual.module';
import { MalhaPDCIModule } from './malha_pdci/malha_pdci.module';
import { ContagemModule } from './contagem/contagem.module';
import { DadosModule } from './dados/dados.module';
import { MalhaComparativaModule } from './malha_comparativa/malha_comparativa.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'), 
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false, 
        },
        retryAttempts: 3,
        retryDelay: 3000,
        logging: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    Zonas30Module,
    BicicletarModule,
    MalhaAtualModule,
    MalhaPDCIModule,
    ContagemModule,
    DadosModule,
    MalhaComparativaModule,
  ],
})
export class AppModule {}
