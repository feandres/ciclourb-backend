import { Controller, Get } from '@nestjs/common';
import { MalhaPDCIService } from './malha_pdci.service';

@Controller('malha-pdci')
export class MalhaPDCIController {
  constructor(private readonly malhaPDCIService: MalhaPDCIService) {}

  @Get()
  async findAll() {
    return this.malhaPDCIService.findAll();
  }
}
