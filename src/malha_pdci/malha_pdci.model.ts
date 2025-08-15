import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class MalhaPDCIModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  fid?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  trecho?: string;

  @Field({ nullable: true })
  tipologia?: string;

  @Field({ nullable: true })
  sentido?: string;

  @Field({ nullable: true })
  prazo?: string;

  @Field({ nullable: true })
  executado?: string;

  @Field({ nullable: true })
  ano?: string;

  @Field({ nullable: true })
  dentro_do_prazo?: string;

  @Field({ nullable: true })
  obs?: string;

  @Field(() => Int, { nullable: true })
  extensao?: number;

  @Field(() => Int, { nullable: true })
  extensao_executada?: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  geom?: any;
}
