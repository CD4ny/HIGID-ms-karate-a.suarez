import { Test, TestingModule } from '@nestjs/testing';
import { KumiteController } from './kumite.controller';
import { KumiteService } from './kumite.service';

describe('KumiteController', () => {
  let controller: KumiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KumiteController],
      providers: [KumiteService],
    }).compile();

    controller = module.get<KumiteController>(KumiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
