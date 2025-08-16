import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MalhaAtualModel } from './malha_atual.model';

@Injectable()
export class MalhaAtualService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<MalhaAtualModel[]> {
    const result = await this.dataSource.query(`
    SELECT
      id, fid, pdci, tipologia, ano, extensao,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.malha_atual;
  `);
    return result;
  }

  async totalKm(): Promise<number> {
    const result = await this.dataSource.query(`
      SELECT COALESCE(SUM(extensao), 0) AS total_km
      FROM malha_atual;
    `);
    return result[0].total_km;
  }
}
