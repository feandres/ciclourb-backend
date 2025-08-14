import { Test, TestingModule } from '@nestjs/testing';
import { ViasService } from './vias.service';

describe('ViasService', () => {
  let service: ViasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViasService],
    }).compile();

    service = module.get<ViasService>(ViasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
