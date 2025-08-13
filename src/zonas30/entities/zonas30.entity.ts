import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity('zonas_30') 
@ObjectType()
export class Zonas30 {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ type: 'geometry', nullable: true })
  @Field({ nullable: true })
  geom?: string;
}
