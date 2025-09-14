import { Module } from '@nestjs/common';
import { PontosContagemService } from './pontos_contagem.service';
import { PontosContagemController } from './pontos_contagem.controller';

@Module({
  controllers: [PontosContagemController],
  providers: [PontosContagemService],
})
export class PontosContagemModule {}
