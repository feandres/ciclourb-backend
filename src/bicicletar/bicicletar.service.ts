import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BicicletarService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<any> {
    const result = await this.dataSource.query(`
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(
          jsonb_build_object(
            'type',       'Feature',
            'geometry',   ST_AsGeoJSON(
                            ST_Transform(
                              ST_SetSRID(ST_PointOnSurface(geom), 31984), 
                              4326
                            )
                          )::jsonb,
            'properties', to_jsonb(b) - 'geom'
          )
        )
      ) AS geojson
      FROM public.bicicletar b;
    `);

    return result[0].geojson;
  }

  async totalPontos(): Promise<number> {
    const result = await this.dataSource.query(`
      SELECT COUNT(*) AS total FROM public.bicicletar;
    `);
    return parseInt(result[0].total, 10);
  }
}
