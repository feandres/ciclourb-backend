import { Test, TestingModule } from '@nestjs/testing';
import { Zonas30Service } from './zonas30.service';

describe('Zonas30Service', () => {
  let service: Zonas30Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Zonas30Service],
    }).compile();

    service = module.get<Zonas30Service>(Zonas30Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
