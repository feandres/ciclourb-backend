import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zonas30 } from './entities/zonas30.entity';

@Injectable()
export class Zonas30Service {
  constructor(
    @InjectRepository(Zonas30)
    private readonly repo: Repository<Zonas30>,
  ) {}

  findAll(): Promise<Zonas30[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Zonas30 | null> {
    return this.repo.findOneBy({ id });
  }

}
