import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
