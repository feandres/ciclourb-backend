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

@ObjectType()
export class QuadroComparativoItemType {
  @Field()
  tipologia: string;

  @Field()
  categoria: string;

  @Field(() => Int)
  valor: number;
}

@ObjectType()
export class ContagemCiclistaType {
  @Field({ nullable: true })
  local: string;

  @Field({ nullable: true })
  data: string;

  @Field({ nullable: true })
  turno: string;

  @Field({ nullable: true })
  total: string;

  @Field({ nullable: true })
  realizador: string;

  @Field({ nullable: true })
  ano: string;

  @Field({ nullable: true })
  geom: string;
}




