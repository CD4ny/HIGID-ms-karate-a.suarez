import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { AppDto } from 'src/app.dto';
export class CreateKaratecaDto extends PartialType(AppDto) {
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
