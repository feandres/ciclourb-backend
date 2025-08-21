import { Module } from '@nestjs/common';
import { BicicletarService } from './bicicletar.service';
import { BicicletarController } from './bicicletar.controller';

@Module({
  providers: [BicicletarService],
  controllers: [BicicletarController],
})
export class BicicletarModule {}
