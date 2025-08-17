import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class IndicadorType {
  @Field()
  nome: string;

  @Field(() => String, { nullable: true })
  unidade?: string;

  @Field(() => Int, { nullable: true })
  valor?: number;
}

@ObjectType()
export class SerieHistoricaTipologiaType {
  @Field()
  ano: string;

  @Field()
  tipologia: string;

  @Field(() => Int)
  valor: number;
}

@ObjectType()
export class SerieHistoricaType {
  @Field()
  ano: string;

  @Field(() => Int)
  valor: number;
}

@ObjectType()
export class MalhaTotalPorTipologiaType {
  @Field({ nullable: true })
  tipologia?: string;

  @Field(() => Int)
  valor: number;
}

@ObjectType()
export class MalhaPorTipologiaType {
  @Field()
  ano: string;

  @Field()
  tipologia: string;

  @Field(() => Int)
  valor: number;
}



