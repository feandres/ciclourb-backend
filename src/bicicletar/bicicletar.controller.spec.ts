import { Test, TestingModule } from '@nestjs/testing';
import { BicicletarController } from './bicicletar.controller';

describe('BicicletarController', () => {
  let controller: BicicletarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicicletarController],
    }).compile();

    controller = module.get<BicicletarController>(BicicletarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
