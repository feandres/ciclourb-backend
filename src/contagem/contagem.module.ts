import { Module } from '@nestjs/common';
import { ContagemService } from './contagem.service';
import { ContagemController } from './contagem.controller';
@Module({
  providers: [ContagemService],
  controllers: [ ContagemController]
})
export class ContagemModule {}
