import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateCompetitiveActivityDto {
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
