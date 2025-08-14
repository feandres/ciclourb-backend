import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class BicicletarModel {
  @Field(() => Int)
  fid: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  id_estacao?: string;

  @Field(() => Int, { nullable: true })
  vagas_atuais?: number;

  @Field(() => Int, { nullable: true })
  ano_inauguracao?: number;

  @Field({ nullable: true })
  bairro?: string;

  @Field({ nullable: true })
  regional?: string;

  @Field(() => Float, { nullable: true })
  long?: number;

  @Field(() => Float, { nullable: true })
  lat?: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  geom?: any;
}
