import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('zonas_30', { schema: 'public' })
export class Zonas30 {
  @PrimaryGeneratedColumn()
  fid: number;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @Column({ type: 'geometry', nullable: true })
  geom: string | null;
}
