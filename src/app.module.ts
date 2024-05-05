import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { KaratecaModule } from './karateca/karateca.module';
import { KumiteModule } from './kumite/kumite.module';
import { IndicatorModule } from './indicator/indicator.module';
import { CompetitiveActivityModule } from './competitive-activity/competitive-activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KaratecaModule,
    KumiteModule,
    IndicatorModule,
    CompetitiveActivityModule,
  ],
})
export class AppModule {}
