import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BicicletarModel } from './bicicletar.model';

@Injectable()
export class BicicletarService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<BicicletarModel[]> {
    const result = await this.dataSource.query(`
    SELECT
      fid, name, id_estacao, vagas_atuais, ano_inauguracao, bairro, regional, long, lat,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.bicicletar;
  `);
    return result;
  }
}
