import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ViasModel } from './vias.model';

@Injectable()
export class ViasService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<ViasModel[]> {
    const result = await this.dataSource.query(`
    SELECT
      fid, via, pdci, tipologia, ano, extensao, plano_pdci, prazo_pdci,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.vias;
  `);
    return result;
  }
}
