import { Module } from '@nestjs/common';
import { MalhaPDCIService } from './malha_pdci.service';
import { MalhaPDCIController } from './malha_pdci.controller';

@Module({
  providers: [MalhaPDCIService],
  controllers: [MalhaPDCIController]
})
export class MalhaPDCIModule {}

