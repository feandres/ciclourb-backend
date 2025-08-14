import { Module } from '@nestjs/common';
import { Zonas30Service } from './zonas30.service';
import { Zonas30Resolver } from './zonas30.resolver';

@Module({
  providers: [Zonas30Service, Zonas30Resolver],
})
export class Zonas30Module {}
