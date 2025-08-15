import { Module } from '@nestjs/common';
import { MalhaAtualService } from './malha_atual.service';
import { MalhaAtualResolver } from './malha_atual.resolver';

@Module({
  providers: [MalhaAtualService, MalhaAtualResolver],
})
export class MalhaAtualModule {}

