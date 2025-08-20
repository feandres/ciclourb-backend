// dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DadosService {
  constructor(private readonly dataSource: DataSource) {}

  async indicadoresGerais() {
    const [malha] = await this.dataSource.query(`
        SELECT COALESCE(SUM(extensao),0) as total_km FROM malha_atual
    `);

    const [bicicletar] = await this.dataSource.query(`
        SELECT COUNT(*) as total_estacoes FROM bicicletar
    `);

    const [malhaPDCIproposta] = await this.dataSource.query(
      `
        SELECT COALESCE(SUM(extensao),0) as total_km FROM malha_pdci
        `,
    );

    const [malhaPDCIconforme] = await this.dataSource.query(`
        SELECT 
        SUM(CAST(extensao AS NUMERIC)) AS total_extensao
        FROM malha_pdci
        WHERE executado = 'Sim';
    `);

    const [totalCiclorrota] = await this.dataSource.query(
      `
        SELECT COALESCE(SUM(extensao),0) as total_km FROM malha_atual WHERE tipologia = 'Ciclorrota';
    `,
    );

    const [totalPasseioCompartilhado] = await this.dataSource.query(`
        SELECT COALESCE(SUM(extensao),0) as total_km FROM malha_atual WHERE tipologia = 'Passeio compartilhado';    
    `);

    const [totalCiclofaixa] = await this.dataSource.query(`
        SELECT COALESCE(SUM(extensao),0) as total_km FROM malha_atual WHERE tipologia = 'Ciclofaixa bidirecional' OR tipologia = 'Ciclofaixa unidirecional';    
    `);

    const [totalCiclovia] = await this.dataSource.query(`
        SELECT COALESCE(SUM(extensao),0) as total_km FROM malha_atual WHERE tipologia = 'Ciclovia bidirecional';    
    `);

    return [
      {
        nome: 'Malha Cicloviária',
        unidade: 'm',
        valor: Math.round(malha.total_km),
      },
      {
        nome: 'Estações Bicicletar',
        unidade: 'unidades',
        valor: bicicletar.total_estacoes,
      },
      {
        nome: 'Malha Proposta PDCI',
        unidade: 'm',
        valor: Math.round(malhaPDCIproposta.total_km),
      },
      {
        nome: 'Malha Implantada Conforme PDCI',
        unidade: 'm',
        valor: Math.round(malhaPDCIconforme.total_extensao),
      },
      {
        nome: 'Ciclorrotas',
        unidade: 'm',
        valor: Math.round(totalCiclorrota.total_km),
      },
      {
        nome: 'Passeios Compartilhados',
        unidade: 'm',
        valor: Math.round(totalPasseioCompartilhado.total_km),
      },
      {
        nome: 'Ciclofaixas',
        unidade: 'm',
        valor: Math.round(totalCiclofaixa.total_km),
      },
      {
        nome: 'Ciclovias',
        unidade: 'm',
        valor: Math.round(totalCiclovia.total_km),
      },
    ];
  }

  async evolucaoMalhaPorAno(): Promise<{ ano: string; valor: number }[]> {
    return this.dataSource.query(`
    SELECT
      ano,
      SUM(SUM(extensao)) OVER (ORDER BY ano) AS valor
    FROM malha_atual
    GROUP BY ano
    ORDER BY ano;
  `);
  }

  async contagemCiclistas(
    page: number,
    limit: number,
    ano?: string,
    turno?: string,
    realizador?: string,
  ): Promise<
    {
      local: string;
      data: string;
      turno: string;
      total: string;
      realizador: string;
      ano: string;
      geom: string;
    }[]
  > {
    const offset = (page - 1) * limit;

    return this.dataSource.query(
      `
    SELECT
      local,
      data,
      turno,
      total,
      realizador,
      ano,
      geom
    FROM contagem_ciclistas
    WHERE (CAST($1 AS text) IS NULL OR ano = $1)
      AND (CAST($2 AS text) IS NULL OR turno = $2)
      AND (CAST($3 AS text) IS NULL OR realizador = $3)
    ORDER BY ano
    LIMIT $4 OFFSET $5;
    `,
      [ano || null, turno || null, realizador || null, limit, offset],
    );
  }

  async evolucaoMalhaPorTipologia(): Promise<
    { ano: string; tipologia: string; valor: number }[]
  > {
    return this.dataSource.query(`
    SELECT
      ano,
      tipologia_normalizada AS tipologia,
      SUM(SUM(extensao)) OVER (
        PARTITION BY tipologia_normalizada
        ORDER BY ano
      ) AS valor
    FROM (
      SELECT
        ano,
        CASE
          WHEN tipologia IN ('Ciclofaixa bidirecional', 'Ciclofaixa unidirecional')
            THEN 'Ciclofaixa'
          ELSE tipologia
        END AS tipologia_normalizada,
        SUM(extensao) AS extensao
      FROM malha_atual
      WHERE tipologia IN (
        'Ciclorrota',
        'Passeio compartilhado',
        'Ciclofaixa bidirecional',
        'Ciclofaixa unidirecional',
        'Ciclovia bidirecional'
      )
      GROUP BY ano, tipologia_normalizada
    ) t
    GROUP BY ano, tipologia_normalizada
    ORDER BY ano, tipologia_normalizada;
  `);
  }

  async quadroComparativo() {
    // Ciclofaixa
    const [ciclofaixa_anterior] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM malha_comparativa
        WHERE tipologia IN ('Ciclofaixa bidirecional', 'Ciclofaixa unidirecional')
          AND pdci = 'Sim'
          AND status = 'CONTIDO'
          AND ano BETWEEN 2000 AND 2013;
        `,
    );

    const [ciclofaixa_previsto] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM malha_pdci
        WHERE tipologia = 'Ciclofaixa'
      `,
    );

    const [ciclofaixa_executado] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM tipologia
        WHERE tipologia = 'Ciclofaixa'
        AND executado = 'Não'
      `,
    );

    const [ciclofaixa_existente] = await this.dataSource.query(
      `
      
      `,
    );

    // Ciclovia
    const [ciclovia_anterior] = await this.dataSource.query(
      `

      `,
    );

    const [ciclovia_previsto] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM malha_pdci
        WHERE tipologia = 'Ciclovia'
      `,
    );

    const [ciclovia_executado] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM tipologia
        WHERE tipologia = 'Ciclovia'
        AND executado = 'Não'
      `,
    );

    const [ciclovia_existente] = await this.dataSource.query(
      `
      
      `,
    );

    // Passeio Compartilhado
    const [passeio_anterior] = await this.dataSource.query(
      `

      `,
    );

    const [passeio_previsto] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM malha_pdci
        WHERE tipologia = 'Passeio Compartilhado'
      `,
    );

    const [passeio_executado] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM tipologia
        WHERE tipologia = 'Passeio Compartilhado'
        AND executado = 'Não'
      `,
    );

    const [passeio_existente] = await this.dataSource.query(
      `
      
      `,
    );

    // Ciclorrota

    const [ciclorrota_anterior] = await this.dataSource.query(
      `

      `,
    );

    const [ciclorrota_previsto] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM malha_pdci
        WHERE tipologia = 'Ciclorrota'
      `,
    );

    const [ciclorrota_executado] = await this.dataSource.query(
      `
        SELECT 
          COALESCE(SUM(extensao), 0) AS total_km
        FROM tipologia
        WHERE tipologia = 'Ciclorrota'
        AND executado = 'Não'
      `,
    );

    const [ciclorrota_existente] = await this.dataSource.query(
      `
      
      `,
    );

    return [
      {
        tipologia: 'Ciclofaixa',
        categoria: 'anterior_pdci',
        valor: Math.round(ciclofaixa_anterior.total_km),
      },
      {
        tipologia: 'Ciclofaixa',
        categoria: 'previsto_pdci',
        valor: Math.round(ciclofaixa_previsto.total_km),
      },
      {
        tipologia: 'Ciclovia',
        categoria: 'previsto_pdci',
        valor: Math.round(ciclovia_previsto.total_km),
      },
      {
        tipologia: 'Passeio Compartilhado',
        categoria: 'previsto_pdci',
        valor: Math.round(passeio_previsto.total_km),
      },
      {
        tipologia: 'Ciclorrota',
        categoria: 'previsto_pdci',
        valor: Math.round(ciclorrota_previsto.total_km),
      },
      {
        tipologia: 'Ciclofaixa',
        categoria: 'executado_pdci',
        valor: Math.round(ciclofaixa_executado.total_km),
      },
      {
        tipologia: 'Ciclovia',
        categoria: 'executado_pdci',
        valor: Math.round(ciclovia_executado.total_km),
      },
      {
        tipologia: 'Passeio Compartilhado',
        categoria: 'executado_pdci',
        valor: Math.round(passeio_executado.total_km),
      },
      {
        tipologia: 'Ciclorrota',
        categoria: 'executado_pdci',
        valor: Math.round(ciclorrota_executado.total_km),
      },
    ];
  }
}
