import { Entity, PrimaryColumn, Column } from 'typeorm';


@Entity('bicicletar')
export class Bicicletar {
  @PrimaryColumn()
  fid: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  id_estacao?: string;

  @Column({ nullable: true, type: 'int' })
  vagas_atuais?: number;

  @Column({ nullable: true, type: 'int' })
  ano_inauguracao?: number;

  @Column({ nullable: true })
  bairro?: string;

  @Column({ nullable: true })
  regional?: string;

  @Column({ nullable: true, type: 'numeric' })
  long?: number;

  @Column({ nullable: true, type: 'numeric' })
  lat?: number;

  @Column({ nullable: true })
  geom?: string; // para PostGIS real, ideal usar Geometry
}
