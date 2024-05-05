import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { IndicatorService } from './indicator.service';
import { IndicatorController } from './indicator.controller';

@Module({
  controllers: [IndicatorController],
  providers: [IndicatorService, PrismaService],
})
export class IndicatorModule {}
