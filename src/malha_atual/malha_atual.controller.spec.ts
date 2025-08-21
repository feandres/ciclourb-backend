import { Test, TestingModule } from '@nestjs/testing';
import { MalhaAtualController } from './malha_atual.controller';

describe('MalhaAtualController', () => {
  let controller: MalhaAtualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MalhaAtualController],
    }).compile();

    controller = module.get<MalhaAtualController>(MalhaAtualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
