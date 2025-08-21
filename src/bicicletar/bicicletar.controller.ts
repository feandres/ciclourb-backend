import { Controller, Get } from '@nestjs/common';
import { BicicletarService } from './bicicletar.service';
import { BicicletarModel } from './bicicletar.model';

@Controller('bicicletar')
export class BicicletarController {
  constructor(private readonly bicicletarService: BicicletarService) {}

  @Get()
  async findAll(): Promise<BicicletarModel[]> {
    return this.bicicletarService.findAll();
  }

  @Get('total')
  async totalPontos(): Promise<{ total: number }> {
    const total = await this.bicicletarService.totalPontos();
    return { total };
  }
}
