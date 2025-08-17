// dashboard.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { DadosService } from './dados.service';
import {
  IndicadorType,
  SerieHistoricaType,
  MalhaTotalPorTipologiaType,
} from './dados.types';

@Resolver()
export class DadosResolver {
  constructor(private readonly dadosService: DadosService) {}

  @Query(() => [IndicadorType])
  async dashboardIndicadores() {
    return this.dadosService.indicadoresGerais();
  }

}
