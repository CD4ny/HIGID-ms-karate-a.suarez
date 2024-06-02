import { IsString, IsOptional } from 'class-validator';

export class GetKumiteQueryParamsDto {
  @IsOptional()
  @IsString()
  compAct?: string;

  @IsOptional()
  @IsString()
  karateca?: string;

  @IsOptional()
  @IsString()
  kumite?: string;
}
