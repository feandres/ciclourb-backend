import { Module } from '@nestjs/common';
import { ViasService } from './vias.service';
import { ViasResolver } from './vias.resolver';


@Module({
  providers: [ViasService, ViasResolver],
})
export class ViasModule {}

