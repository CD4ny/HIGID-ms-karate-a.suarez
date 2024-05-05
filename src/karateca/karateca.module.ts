import { Module } from '@nestjs/common';
import { KaratecaService } from './karateca.service';
import { KaratecaController } from './karateca.controller';

@Module({
  controllers: [KaratecaController],
  providers: [KaratecaService],
})
export class KaratecaModule {}
