import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ViasService } from './vias.service';
import { ViasModel } from './vias.model';

@Resolver(() => ViasModel)
export class ViasResolver {
  constructor(private readonly viasService: ViasService) {}

  @Query(() => [ViasModel])
  viasAll() {
    return this.viasService.findAll();
  }


}
