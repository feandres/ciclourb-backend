import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zonas30 } from './entities/zonas30.entity';
import { Zonas30Service } from './zonas30.service';
import { Zonas30Resolver } from './zonas30.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Zonas30])],
  providers: [Zonas30Service, Zonas30Resolver],
})
export class Zonas30Module {}
