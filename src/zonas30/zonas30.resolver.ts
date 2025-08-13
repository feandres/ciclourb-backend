import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Zonas30Service } from './zonas30.service';
import { Zonas30 } from './entities/zonas30.entity';

@Resolver(() => Zonas30)
export class Zonas30Resolver {
  constructor(private readonly service: Zonas30Service) {}

  @Query(() => [Zonas30])
  zonas30(): Promise<Zonas30[]> {
    return this.service.findAll();
  }

  @Query(() => Zonas30, { nullable: true })
  zona30(@Args('id', { type: () => Int }) id: number): Promise<Zonas30 | null> {
    return this.service.findOne(id);
  }

}
