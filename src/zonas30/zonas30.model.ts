import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Zonas30Model {
  @Field(() => Int)
  fid: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  geom?: any;
}
