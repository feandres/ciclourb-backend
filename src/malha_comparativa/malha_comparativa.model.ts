import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

export class MalhaComparativaModel {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  via?: string;

  @Field({ nullable: true })
  pdci?: string;

  @Field({ nullable: true })
  tipologia?: string;

  @Field(() => Int, { nullable: true })
  ano?: number;

  @Field(() => Int, { nullable: true })
  extensao?: number;

  @Field({ nullable: true })
  status?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  geom?: any;
}
