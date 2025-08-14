import { Test, TestingModule } from '@nestjs/testing';
import { BicicletarService } from './bicicletar.service';

describe('BicicletarService', () => {
  let service: BicicletarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicicletarService],
    }).compile();

    service = module.get<BicicletarService>(BicicletarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
