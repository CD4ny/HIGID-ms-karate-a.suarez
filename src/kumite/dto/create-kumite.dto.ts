import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AppDto } from 'src/app.dto';

export class CreateKumiteDto extends PartialType(AppDto) {
  @IsString()
  @IsNotEmpty()
  compActivityId: string;

  @IsString()
  @IsNotEmpty()
  selectedKaratecaId: string;

  @IsString()
  @IsNotEmpty()
  gi: string;

  @IsString()
  indicators: string;

  @IsString()
  @IsOptional()
  filePath: string;
}
