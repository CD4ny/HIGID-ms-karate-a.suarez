import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { KaratecaService } from './karateca.service';
import { KaratecaController } from './karateca.controller';

@Module({
  controllers: [KaratecaController],
  providers: [KaratecaService, PrismaService],
})
export class KaratecaModule {}
