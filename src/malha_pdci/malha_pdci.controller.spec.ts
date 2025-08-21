import { Test, TestingModule } from '@nestjs/testing';
import { MalhaPDCIController } from './malha_pdci.controller';

describe('MalhaPdciController', () => {
  let controller: MalhaPDCIController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MalhaPDCIController],
    }).compile();

    controller = module.get<MalhaPDCIController>(MalhaPDCIController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
