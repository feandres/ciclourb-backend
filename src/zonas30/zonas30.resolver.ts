import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Zonas30Service } from './zonas30.service';
import { Zonas30Model } from './zonas30.model';

@Resolver(() => Zonas30Model)
export class Zonas30Resolver {
  constructor(private readonly zonas30Service: Zonas30Service) {}

  @Query(() => [Zonas30Model])
  zonas30All() {
    return this.zonas30Service.findAll();
  }

}
