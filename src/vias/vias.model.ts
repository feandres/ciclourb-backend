import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class ViasModel {
  @Field(() => Int)
  fid: number;

  @Field({ nullable: true })
  via?: string;

  @Field({ nullable: true })
  pdci?: boolean;

  @Field({ nullable: true })
  tipologia?: string;

  @Field({ nullable: true })
  ano?: string;

  @Field(() => Float, { nullable: true })
  extensao?: number;

  @Field({ nullable: true })
  plano_pdci?: string;

  @Field({ nullable: true })
  prazo_pdci?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  geom?: any;
}
