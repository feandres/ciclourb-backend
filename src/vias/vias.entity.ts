import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('vias', { schema: 'public' })
export class Vias {
  @PrimaryColumn()
  fid: number;

  @Column({ type: 'text', nullable: true })
  via: string | null;

  @Column({ type: 'boolean', nullable: true })
  pdci: boolean | null;

  @Column({ type: 'text', nullable: true })
  tipologia: string | null;

  @Column({ type: 'text', nullable: true })
  ano: string | null;

  @Column({ type: 'numeric', nullable: true })
  extensao: number | null;

  @Column({ type: 'text', nullable: true })
  geom: string | null;

  @Column({ type: 'text', nullable: true })
  plano_pdci: string | null;

  @Column({ type: 'geometry', nullable: true })
  prazo_pdci: string | null;
}
