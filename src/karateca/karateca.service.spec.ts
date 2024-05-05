import { Test, TestingModule } from '@nestjs/testing';
import { KaratecaService } from './karateca.service';

describe('KaratecaService', () => {
  let service: KaratecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KaratecaService],
    }).compile();

    service = module.get<KaratecaService>(KaratecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
