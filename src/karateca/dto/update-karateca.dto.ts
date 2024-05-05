import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

import { CreateKaratecaDto } from './create-karateca.dto';

export class UpdateKaratecaDto extends PartialType(CreateKaratecaDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  // todo: implement file upload
  file?: string;
}
