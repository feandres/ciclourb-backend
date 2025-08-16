import { Module } from '@nestjs/common';
import { ContagemService } from './contagem.service';
import { ContagemResolver } from './contagem.resolver';

@Module({
  providers: [ContagemService, ContagemResolver],
})
export class ContagemModule {}
