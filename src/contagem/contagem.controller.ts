import { Controller, Get, Query } from '@nestjs/common';
import { ContagemService } from './contagem.service';
import { ContagemModel } from './contagem.model';

@Controller('contagem')
export class ContagemController {
  constructor(private readonly contagemService: ContagemService) {}

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('ano') ano?: string,
    @Query('turno') turno?: string,
    @Query('realizador') realizador?: string,
  ): Promise<{ data: ContagemModel[]; total: number; page: number; limit: number }> {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const { data, total } = await this.contagemService.findAll(pageNum, limitNum, ano, turno, realizador);

    return { data, total, page: pageNum, limit: limitNum };
  }
}
