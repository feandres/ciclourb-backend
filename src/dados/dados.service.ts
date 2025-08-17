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

  async evolucaoMalhaPorTipologia(): Promise<
    { ano: string; tipologia: string; valor: number }[]
  > {
    return this.dataSource.query(`
    SELECT
      ano,
      CASE
          WHEN tipologia IN ('Ciclofaixa bidirecional', 'Ciclofaixa unidirecional') THEN 'Ciclofaixa'
          ELSE tipologia
      END AS tipologia,
      SUM(SUM(extensao)) OVER (PARTITION BY
          CASE
              WHEN tipologia IN ('Ciclofaixa bidirecional', 'Ciclofaixa unidirecional') THEN 'Ciclofaixa'
              ELSE tipologia
          END
          ORDER BY ano
      ) AS valor
    FROM malha_atual
    WHERE tipologia IN (
        'Ciclorrota',
        'Passeio compartilhado',
        'Ciclofaixa bidirecional',
        'Ciclofaixa unidirecional',
        'Ciclovia bidirecional'
    )
    GROUP BY ano, tipologia
    ORDER BY ano, tipologia;
  `);
  }
}
