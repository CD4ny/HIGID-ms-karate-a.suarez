import { Module } from '@nestjs/common';
import { KumiteService } from './kumite.service';
import { KumiteController } from './kumite.controller';

@Module({
  controllers: [KumiteController],
  providers: [KumiteService],
})
export class KumiteModule {}
