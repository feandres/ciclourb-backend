import { Controller, Get, Query } from '@nestjs/common';
import { DadosService } from './dados.service';

@Controller('dados')
export class DadosController {
  constructor(private readonly dadosService: DadosService) {}

  @Get('indicadores')
  async indicadores() {
    return this.dadosService.indicadoresGerais();
  }

  @Get('evolucao-malha-ano')
  async evolucaoMalhaAno() {
    return this.dadosService.evolucaoMalhaPorAno();
  }

  @Get('evolucao-malha-tipologia')
  async evolucaoMalhaTipologia() {
    return this.dadosService.evolucaoMalhaPorTipologia();
  }

  @Get('contagem-ciclistas')
  async contagemCiclistas(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('ano') ano?: string,
    @Query('turno') turno?: string,
    @Query('realizador') realizador?: string,
  ) {
    return this.dadosService.contagemCiclistas(
      Number(page),
      Number(limit),
      ano,
      turno,
      realizador,
    );
  }

  @Get('quadro-comparativo')
  async quadroComparativo() {
    return this.dadosService.quadroComparativo();
  }
}
