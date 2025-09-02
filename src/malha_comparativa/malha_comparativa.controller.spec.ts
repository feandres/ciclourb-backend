import { Test, TestingModule } from '@nestjs/testing';
import { MalhaComparativaController } from './malha_comparativa.controller';
import { MalhaComparativaService } from './malha_comparativa.service';

describe('MalhaComparativaController', () => {
  let controller: MalhaComparativaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MalhaComparativaController],
      providers: [MalhaComparativaService],
    }).compile();

    controller = module.get<MalhaComparativaController>(MalhaComparativaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
