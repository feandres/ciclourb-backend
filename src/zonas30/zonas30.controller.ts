import { Controller, Get } from '@nestjs/common';
import { Zonas30Service } from './zonas30.service';

@Controller('zonas30')
export class Zonas30Controller {
  constructor(private readonly zonas30Service: Zonas30Service) {}

  @Get()
  async findAll() {
    return this.zonas30Service.findAll();
  }
}
