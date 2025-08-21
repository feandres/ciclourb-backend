import { Test, TestingModule } from '@nestjs/testing';
import { Zonas30Controller } from './zonas30.controller';

describe('Zonas30Controller', () => {
  let controller: Zonas30Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Zonas30Controller],
    }).compile();

    controller = module.get<Zonas30Controller>(Zonas30Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
