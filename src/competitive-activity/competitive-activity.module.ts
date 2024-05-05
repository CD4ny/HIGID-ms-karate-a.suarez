import { Module } from '@nestjs/common';
import { CompetitiveActivityService } from './competitive-activity.service';
import { CompetitiveActivityController } from './competitive-activity.controller';

@Module({
  controllers: [CompetitiveActivityController],
  providers: [CompetitiveActivityService],
})
export class CompetitiveActivityModule {}
