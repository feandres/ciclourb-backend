import { Test, TestingModule } from '@nestjs/testing';
import { Zonas30Resolver } from './zonas30.resolver';

describe('Zonas30Resolver', () => {
  let resolver: Zonas30Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Zonas30Resolver],
    }).compile();

    resolver = module.get<Zonas30Resolver>(Zonas30Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
