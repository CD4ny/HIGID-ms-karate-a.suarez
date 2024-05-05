import { Test, TestingModule } from '@nestjs/testing';
import { KaratecaController } from './karateca.controller';
import { KaratecaService } from './karateca.service';

describe('KaratecaController', () => {
  let controller: KaratecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KaratecaController],
      providers: [KaratecaService],
    }).compile();

    controller = module.get<KaratecaController>(KaratecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
