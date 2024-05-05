import { Test, TestingModule } from '@nestjs/testing';
import { CompetitiveActivityController } from './competitive-activity.controller';
import { CompetitiveActivityService } from './competitive-activity.service';

describe('CompetitiveActivityController', () => {
  let controller: CompetitiveActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitiveActivityController],
      providers: [CompetitiveActivityService],
    }).compile();

    controller = module.get<CompetitiveActivityController>(CompetitiveActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
