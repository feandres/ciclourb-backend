import { Test, TestingModule } from '@nestjs/testing';
import { MalhaComparativaService } from './malha_comparativa.service';

describe('MalhaComparativaService', () => {
  let service: MalhaComparativaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MalhaComparativaService],
    }).compile();

    service = module.get<MalhaComparativaService>(MalhaComparativaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
