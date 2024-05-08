import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateKumiteDto {
  @IsNumber()
  @IsNotEmpty()
  compActivityId: number;
  @IsNumber()
  @IsNotEmpty()
  selectedKaratecaId: number;

  @IsString()
  @IsNotEmpty()
  gi: string;

  @IsString({ each: true })
  indicators: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  evaluation: string;

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
  sectionType: string;

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
