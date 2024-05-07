import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
export class CreateKaratecaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  // todo: implement file upload
  file?: string;
}
