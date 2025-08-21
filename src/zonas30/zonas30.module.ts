import { Module } from '@nestjs/common';
import { Zonas30Service } from './zonas30.service';
import { Zonas30Controller } from './zonas30.controller';

@Module({
  providers: [Zonas30Service],
  controllers: [Zonas30Controller]
})
export class Zonas30Module {}
