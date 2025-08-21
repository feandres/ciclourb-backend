import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  data_inauguracao?: string;

  @Field(() => Int, { nullable: true })
  ano_inauguracao?: number;

  @Field({ nullable: true })
  bairro?: string;

  @Field({ nullable: true })
  regional?: string;

  @Field({ nullable: true })
  geom?: string;
}
