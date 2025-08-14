import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BicicletarService } from './bicicletar.service';
import { BicicletarModel } from './bicicletar.model';

@Resolver(() => BicicletarModel)
export class BicicletarResolver {
  constructor(private readonly bicicletarService: BicicletarService) {}

  @Query(() => [BicicletarModel])
  bicicletarAll() {
    return this.bicicletarService.findAll();
  }

}
