import { Module } from '@nestjs/common';
import { BicicletarService } from './bicicletar.service';
import { BicicletarResolver } from './bicicletar.resolver';

@Module({
  providers: [BicicletarService, BicicletarResolver],
})
export class BicicletarModule {}
