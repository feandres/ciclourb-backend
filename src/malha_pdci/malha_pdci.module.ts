import { Module } from '@nestjs/common';
import { MalhaPDCIService } from './malha_pdci.service';
import { MalhaPDCIResolver } from './malha_pdci.resolver';

@Module({
  providers: [MalhaPDCIService, MalhaPDCIResolver],
})
export class MalhaPDCIModule {}

