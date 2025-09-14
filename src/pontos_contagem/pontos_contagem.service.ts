import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PontosContagemService {
  constructor(private readonly dataSource: DataSource) {}
  
  async findAll(): Promise<any> {
    const result = await this.dataSource.query(`
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(
          jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(
              ST_Transform(
                -- Converte MultiPoint em Point
                ST_SetSRID(ST_GeometryN(geom, 1), 31984),
                4326
              )
            )::jsonb,
            'properties', jsonb_build_object(
              'geom', geom
            )
          )
        )
      ) AS geojson
    FROM pontos_contagem;
  `);
    return result[0].geojson;
  }
}
