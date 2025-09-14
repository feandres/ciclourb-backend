import { Test, TestingModule } from '@nestjs/testing';
import { PontosContagemController } from './pontos_contagem.controller';
import { PontosContagemService } from './pontos_contagem.service';

describe('PontosContagemController', () => {
  let controller: PontosContagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PontosContagemController],
      providers: [PontosContagemService],
    }).compile();

    controller = module.get<PontosContagemController>(PontosContagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
