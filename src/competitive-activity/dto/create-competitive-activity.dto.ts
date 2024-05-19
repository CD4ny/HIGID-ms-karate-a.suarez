import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { AppDto } from 'src/app.dto';

export class CreateCompetitiveActivityDto extends PartialType(AppDto) {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  desc: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  startDate: string;
  @IsOptional()
  @IsString()
  endDate: string;

  @IsNumber({}, { each: true })
  karatecasIds: number[];
}
