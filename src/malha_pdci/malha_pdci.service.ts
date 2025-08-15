import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MalhaPDCIModel } from './malha_pdci.model';


@Injectable()
export class MalhaPDCIService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<MalhaPDCIModel[]> {
    const result = await this.dataSource.query(`
    SELECT
      id, fid, name, trecho, tipologia, sentido, prazo, executado, ano, dentro_do_prazo, obs, extensao, extensao_executada,
      ST_AsGeoJSON(geom)::json AS geom
    FROM public.malha_pdci;
  `);
    return result;
  }
}
