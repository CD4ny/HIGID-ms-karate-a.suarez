import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCompetitiveActivityDto {
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
