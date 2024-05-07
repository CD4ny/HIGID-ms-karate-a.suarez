import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CompetitiveActivityService } from './competitive-activity.service';
import { CompetitiveActivityController } from './competitive-activity.controller';

@Module({
  controllers: [CompetitiveActivityController],
  providers: [CompetitiveActivityService, PrismaService],
})
export class CompetitiveActivityModule {}
