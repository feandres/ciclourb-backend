import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

@Entity('malha_pdci')
@ObjectType()
export class MalhaPDCI {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  fid: string | null;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'text', nullable: true })
  trecho: string | null;

  @Column({ type: 'text', nullable: true })
  tipologia: string | null;

  @Column({ type: 'text', nullable: true })
  sentido: string | null;

  @Column({ type: 'text', nullable: true })
  prazo: string | null;

  @Column({ type: 'text', nullable: true })
  executado: string | null;

  @Column({ type: 'text', nullable: true })
  ano: string | null;

  @Column({ type: 'text', nullable: true })
  dentro_do_prazo: string | null;

  @Column({ type: 'text', nullable: true })
  obs: string | null;

  @Column({ type: 'text', nullable: true })
  extensao: string | null;

  @Column({ type: 'text', nullable: true })
  extensao_executada: string | null;

  @Column({ type: 'geometry', nullable: true })
  prazo_pdci: string | null;
}
