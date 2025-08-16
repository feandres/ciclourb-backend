import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class ContagemModel {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  lat?: string;

  @Field({ nullable: true })
  lon?: string;

  @Field({ nullable: true })
  lat_lon?: string;

  @Field({ nullable: true })
  local?: string;

  @Field({ nullable: true })
  data?: string;

  @Field({ nullable: true })
  turno?: string;

  @Field({ nullable: true })
  inicio?: string;

  @Field({ nullable: true })
  fim?: string;

  @Field({ nullable: true })
  masculino?: string;

  @Field({ nullable: true })
  feminino?: string;

  @Field({ nullable: true })
  total?: string;

  @Field({ nullable: true })
  ciclistas_por_min?: string;

  @Field({ nullable: true })
  realizador?: string;

  @Field({ nullable: true })
  ano?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  geom?: any;
}
