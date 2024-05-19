import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { AppDto } from 'src/app.dto';

class Indicator {
  @IsNumber()
  id: number;

  @IsString()
  value: string;
}

export class EvaluateKumiteDto extends PartialType(AppDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  evaluation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Indicator)
  @IsOptional()
  indicators: Indicator[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  kumiteType: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  distance: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sequenceType: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  strikeZones: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  partialTimes: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  levelOfPreparation: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  motorSequence: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  kumiteEnding: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  informalWarnings: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  officialWarnings: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  penalties: string;
}
