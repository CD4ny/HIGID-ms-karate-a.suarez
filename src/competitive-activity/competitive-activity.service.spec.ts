import { Test, TestingModule } from '@nestjs/testing';
import { CompetitiveActivityService } from './competitive-activity.service';

describe('CompetitiveActivityService', () => {
  let service: CompetitiveActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitiveActivityService],
    }).compile();

    service = module.get<CompetitiveActivityService>(CompetitiveActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
