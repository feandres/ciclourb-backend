import { Controller, Get } from '@nestjs/common';
import { MalhaComparativaService } from './malha_comparativa.service';

@Controller('malha-comparativa')
export class MalhaComparativaController {
  constructor(private readonly malhaComparativaService: MalhaComparativaService) {}

  @Get()
  async findAll() {
    return this.malhaComparativaService.findAll();
  }

  @Get("malha-existente")
  async getMalhaExistente() {
    return this.malhaComparativaService.getMalhaExistente();
  }
  
}
