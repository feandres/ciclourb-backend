import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PontosContagemService } from './pontos_contagem.service';

@Controller('pontos-contagem')
export class PontosContagemController {
  constructor(private readonly pontosContagemService: PontosContagemService) {}
  
  @Get()
  async findAll() {
    return this.pontosContagemService.findAll();
  }

  @Get("/findAllByYear")
  async findAllByYear(
    @Query("ano") ano
  ) {
    return this.pontosContagemService.findAllByYear(ano);
  }

}
