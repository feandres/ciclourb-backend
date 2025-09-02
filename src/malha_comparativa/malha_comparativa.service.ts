import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MalhaComparativaModel } from './malha_comparativa.model';

@Injectable()
export class MalhaComparativaService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<MalhaComparativaModel[]> {
    const result = await this.dataSource.query(`
    SELECT
      id, via, pdci, tipologia, ano, extensao, status,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.malha_comparativa;
  `);
    return result;
  }

  async getMalhaExistente() {
    const result = await this.dataSource.query(`
    SELECT
      id, via, pdci, tipologia, ano, extensao, status,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.malha_comparativa 
    WHERE status = 'EXISTENTE';
  `);
    return result;
  }
}
