import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { KumiteService } from './kumite.service';
import { KumiteController } from './kumite.controller';

@Module({
  controllers: [KumiteController],
  providers: [KumiteService, PrismaService],
})
export class KumiteModule {}
