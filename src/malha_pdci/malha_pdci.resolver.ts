import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {MalhaPDCIService} from './malha_pdci.service';
import { MalhaPDCIModel } from './malha_pdci.model';

@Resolver(() => MalhaPDCIModel)
export class MalhaPDCIResolver {
  constructor(private readonly malhaPDCIService: MalhaPDCIService) {}

  @Query(() => [MalhaPDCIModel])
  malhaPDCIAll() {
    return this.malhaPDCIService.findAll();
  }


}
