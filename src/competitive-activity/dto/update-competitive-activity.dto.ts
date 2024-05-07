import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCompetitiveActivityDto } from './create-competitive-activity.dto';

export class UpdateCompetitiveActivityDto extends PartialType(
  CreateCompetitiveActivityDto,
) {
  @IsOptional()
  @IsString()
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
