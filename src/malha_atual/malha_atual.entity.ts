import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

@Entity('malha_atual')
@ObjectType()
export class MalhaAtual {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  fid: string | null;

  @Column({ type: 'text', nullable: true })
  via: string | null;

  @Column({ type: 'text', nullable: true })
  pdci: string | null;

  @Column({ type: 'text', nullable: true })
  tipologia: string | null;

  @Column({ type: 'numeric', nullable: true })
  ano: number | null;

  @Column({ type: 'numeric', nullable: true })
  extensao: number | null;

  @Column({ type: 'geometry', nullable: true })
  geom: string | null;
}
