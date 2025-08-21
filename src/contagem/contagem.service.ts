import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ContagemModel } from './contagem.model';

@Injectable()
export class ContagemService {
  constructor(private readonly dataSource: DataSource) {}

  async allContagens(): Promise<any> {
    const result = await this.dataSource.query(`
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(
          jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(
              ST_Transform(
                -- Converte MultiPoint em Point
                ST_SetSRID(ST_GeometryN(geom,1), 31984),
                4326
              )
            )::jsonb,
            'properties', to_jsonb(c) - 'geom'
          )
        )
      ) AS geojson
      FROM public.contagem_ciclistas c;
    `);

    return result[0].geojson;
  }

  async findAll(
    page: number,
    limit: number,
    ano?: string,
    turno?: string,
    realizador?: string,
  ): Promise<{ data: ContagemModel[]; total: number }> {
    const offset = (page - 1) * limit;

    const where: string[] = [];
    const params: any[] = [];

    if (ano) {
      params.push(ano);
      where.push(`ano = $${params.length}`);
    }
    if (turno) {
      params.push(turno);
      where.push(`turno = $${params.length}`);
    }
    if (realizador) {
      params.push(realizador);
      where.push(`realizador = $${params.length}`);
    }

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const dataQuery = `
      SELECT
        id, lat, lon, lat_lon, local, data, turno, inicio, fim, masculino, feminino, total, ciclistas_por_min, realizador, ano,
        ST_AsGeoJSON(
          ST_Transform(
            ST_SetSRID(ST_GeometryN(geom,1), 31984),
            4326
          )
        )::json AS geom
      FROM public.contagem_ciclistas
      ${whereClause}
      ORDER BY data DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2};
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM public.contagem_ciclistas
      ${whereClause};
    `;

    params.push(limit, offset);

    const [data, countResult] = await Promise.all([
      this.dataSource.query(dataQuery, params),
      this.dataSource.query(countQuery, params.slice(0, -2)),
    ]);

    const total = parseInt(countResult[0]?.total ?? 0, 10);

    return { data, total };
  }
}
