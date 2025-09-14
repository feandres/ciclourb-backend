import { Field } from "@nestjs/graphql";

export class PontosContagem {
  @Field(() => Text)
  geom?: any;
}
