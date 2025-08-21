import { Controller, Get } from '@nestjs/common';
import { MalhaAtualService } from './malha_atual.service';

@Controller('malha-atual')
export class MalhaAtualController {
  constructor(private readonly malhaAtualService: MalhaAtualService) {}

  @Get()
  async findAll() {
    return this.malhaAtualService.findAll();
  }

  @Get('total-km')
  async totalKm() {
    return { total_km: await this.malhaAtualService.totalKm() };
  }
}
