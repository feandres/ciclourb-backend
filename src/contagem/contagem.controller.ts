import { Controller, Get, Query } from '@nestjs/common';
import { ContagemService } from './contagem.service';
import { ContagemModel } from './contagem.model';

@Controller('contagem')
export class ContagemController {
  constructor(private readonly contagemService: ContagemService) {}

  @Get()
  async getContagens(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('ano') ano?: string,
    @Query('turno') turno?: string,
    @Query('realizador') realizador?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: 'data' | 'ano' | 'ciclistas_por_min',
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    return this.contagemService.findAll(
      +page,
      +limit,
      ano,
      turno,
      realizador,
      search,
      sortBy,
      sortOrder,
    );
  }

  @Get('/contagens')
  async contagensAll() {
    return this.contagemService.allContagens();
  }
}
