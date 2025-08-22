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
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        ssl: { rejectUnauthorized: false },
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
