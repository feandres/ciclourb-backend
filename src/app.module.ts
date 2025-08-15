import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ViasModule } from './vias/vias.module';
import { Zonas30Module } from './zonas30/zonas30.module';
import { BicicletarService } from './bicicletar/bicicletar.service';
import { BicicletarModule } from './bicicletar/bicicletar.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MalhaAtualService } from './malha_atual/malha_atual.service';
import { MalhaAtualModule } from './malha_atual/malha_atual.module';
import { MalhaPDCIModule } from './malha_pdci/malha_pdci.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
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
        synchronize: true, // em prod usar migrations (???)
        ssl: { rejectUnauthorized: false }, // Supabase exige SSL
      }),
    }),
    ViasModule,
    Zonas30Module,
    BicicletarModule,
    MalhaAtualModule,
    MalhaPDCIModule,
  ],
  controllers: [AppController],
  providers: [AppService, BicicletarService, MalhaAtualService],
})
export class AppModule {}
