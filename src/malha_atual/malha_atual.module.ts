import { Module } from '@nestjs/common';
import { MalhaAtualService } from './malha_atual.service';
import { MalhaAtualController } from './malha_atual.controller';

@Module({
  providers: [MalhaAtualService],
  controllers: [MalhaAtualController]
})
export class MalhaAtualModule {}

