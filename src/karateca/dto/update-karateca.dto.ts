import { PartialType } from '@nestjs/mapped-types';

import { CreateKaratecaDto } from './create-karateca.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateKaratecaDto extends PartialType(CreateKaratecaDto) {
  @IsString()
  @IsOptional()
  fileChanged: boolean;
}
