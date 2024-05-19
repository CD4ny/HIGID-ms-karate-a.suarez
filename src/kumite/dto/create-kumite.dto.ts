import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AppDto } from 'src/app.dto';

export class CreateKumiteDto extends PartialType(AppDto) {
  @IsNumber()
  @IsNotEmpty()
  compActivityId: number;
  @IsNumber()
  @IsNotEmpty()
  selectedKaratecaId: number;

  @IsString()
  @IsNotEmpty()
  gi: string;

  @IsNumber({}, { each: true })
  indicators: number[];
}
