import { Test, TestingModule } from '@nestjs/testing';
import { PontosContagemService } from './pontos_contagem.service';

describe('PontosContagemService', () => {
  let service: PontosContagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PontosContagemService],
    }).compile();

    service = module.get<PontosContagemService>(PontosContagemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
