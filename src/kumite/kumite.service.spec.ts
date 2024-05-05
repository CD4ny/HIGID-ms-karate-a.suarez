import { Test, TestingModule } from '@nestjs/testing';
import { KumiteService } from './kumite.service';

describe('KumiteService', () => {
  let service: KumiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KumiteService],
    }).compile();

    service = module.get<KumiteService>(KumiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
