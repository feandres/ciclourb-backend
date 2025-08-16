import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('contagem_ciclistas', { schema: 'public' })
export class Contagem {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  lat: string | null;

  @Column({ type: 'text', nullable: true })
  lon: string | null;

  @Column({ type: 'text', nullable: true })
  lat_lon: string | null;

  @Column({ type: 'text', nullable: true })
  local: string | null;

  @Column({ type: 'text', nullable: true })
  data: string | null;

  @Column({ type: 'text', nullable: true })
  turno: string | null;

  @Column({ type: 'text', nullable: true })
  inicio: string | null;

  @Column({ type: 'text', nullable: true })
  fim: string | null;

  @Column({ type: 'text', nullable: true })
  masculino: string | null;

  @Column({ type: 'text', nullable: true })
  feminino: string | null;

  @Column({ type: 'text', nullable: true })
  total: string | null;

  @Column({ type: 'text', nullable: true })
  ciclistas_por_min: string | null;

  @Column({ type: 'text', nullable: true })
  realizador: string | null;

  @Column({ type: 'text', nullable: true })
  ano: string | null;

  @Column({ type: 'geometry', nullable: true })
  geom: any; 
}
