import { Module } from '@nestjs/common';
import { MalhaComparativaService } from './malha_comparativa.service';
import { MalhaComparativaController } from './malha_comparativa.controller';

@Module({
  controllers: [MalhaComparativaController],
  providers: [MalhaComparativaService],
})
export class MalhaComparativaModule {}
