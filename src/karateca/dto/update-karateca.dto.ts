import { PartialType } from '@nestjs/mapped-types';
import { CreateKaratecaDto } from './create-karateca.dto';

export class UpdateKaratecaDto extends PartialType(CreateKaratecaDto) {}
