// dashboard.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { DadosService } from './dados.service';
import {
  IndicadorType,
  SerieHistoricaType,
  MalhaPorTipologiaType,
  QuadroComparativoItemType,
  ContagemCiclistaType
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

  @Query(() => [QuadroComparativoItemType], { name: 'quadroComparativo' })
  async quadroComparativo() {
    return this.dadosService.quadroComparativo();
  }

  @Query(() => [ContagemCiclistaType], { name: 'contagemCiclistas' })
  async contagemCiclistas(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('ano', { type: () => String, nullable: true }) ano?: string,
    @Args('turno', { type: () => String, nullable: true }) turno?: string,
    @Args('realizador', { type: () => String, nullable: true })
    realizador?: string,
  ) {
    return this.dadosService.contagemCiclistas(
      page,
      limit,
      ano,
      turno,
      realizador,
    );
  }
}
