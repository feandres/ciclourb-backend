import { Resolver, Query } from '@nestjs/graphql';
import { ContagemService } from './contagem.service';
import { ContagemModel } from './contagem.model';


@Resolver(() => ContagemModel)
export class ContagemResolver {
  constructor(private readonly contagemService: ContagemService) {}

  @Query(() => [ContagemModel])
  contagemAll() {
    return this.contagemService.findAll();
  }

}
