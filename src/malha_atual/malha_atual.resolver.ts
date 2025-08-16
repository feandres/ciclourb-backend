import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { MalhaAtualService } from './malha_atual.service';
import { MalhaAtualModel } from './malha_atual.model';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver(() => MalhaAtualModel)
export class MalhaAtualResolver {
  constructor(private readonly malhaAtualService: MalhaAtualService) {}

  @Query(() => [MalhaAtualModel])
  malhaAtualAll() {
    return this.malhaAtualService.findAll();
  }

  @Query(() => Int)
  malhaAtualTotalKm() {
    return this.malhaAtualService.totalKm();
  }

}
