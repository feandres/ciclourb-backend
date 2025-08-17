// dashboard.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { DadosService } from './dados.service';
import {
  IndicadorType,
  SerieHistoricaType,
  MalhaPorTipologiaType,
} from './dados.types';

@Resolver()
export class DadosResolver {
  constructor(private readonly dadosService: DadosService) {}

  @Query(() => [IndicadorType])
  async dashboardIndicadores() {
    return this.dadosService.indicadoresGerais();
  }

  @Query(() => [SerieHistoricaType], { name: 'evolucaoMalhaPorAno' })
  async evolucaoMalhaPorAno() {
    return this.dadosService.evolucaoMalhaPorAno();
  }

@Query(() => [MalhaPorTipologiaType], { name: 'evolucaoMalhaPorTipologia' })
async evolucaoMalhaPorTipologia() {
  return this.dadosService.evolucaoMalhaPorTipologia();
}

}
