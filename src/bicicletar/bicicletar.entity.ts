import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('bicicletar', { schema: 'public' })
export class Bicicletar {
  @PrimaryColumn()
  fid: number;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  id_estacao: string | null;

  @Column({ type: 'integer', nullable: true })
  vagas_atuais: number | null;

  @Column({ type: 'integer', nullable: true })
  ano_inauguracao: number | null;

  @Column({ type: 'text', nullable: true })
  bairro: string | null;

  @Column({ type: 'text', nullable: true })
  regional: string | null;

  @Column({ type: 'numeric', nullable: true })
  long: number | null;

  @Column({ type: 'numeric', nullable: true })
  lat: number | null;

  @Column({ type: 'geometry', nullable: true })
  geom: any; 
}
