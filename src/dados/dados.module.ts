// dashboard.module.ts
import { Module } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosResolver } from './dados.resolver';

@Module({
  providers: [DadosService, DadosResolver],
})
export class DadosModule {}
