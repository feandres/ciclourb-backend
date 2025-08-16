import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ContagemModel } from './contagem.model';

@Injectable()
export class ContagemService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<ContagemModel[]> {
    const result = await this.dataSource.query(`
    SELECT
      id, lat, lon, lat_lon, local, data, turno, inicio, fim, masculino, feminino, total, ciclistas_por_min, realizador, ano,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.contagem_ciclistas;
  `);
    return result;
  }
}
