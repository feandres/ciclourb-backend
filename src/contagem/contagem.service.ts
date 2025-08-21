import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ContagemModel } from './contagem.model';

@Injectable()
export class ContagemService {
  constructor(private readonly dataSource: DataSource) {}

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
        ST_AsGeoJSON(geom)::json AS geom
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
