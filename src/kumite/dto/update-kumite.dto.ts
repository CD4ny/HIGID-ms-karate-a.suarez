import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { CreateKumiteDto } from './create-kumite.dto';

export class UpdateKumiteDto extends PartialType(CreateKumiteDto) {
  @IsString()
  @IsOptional()
  fileChanged: string;
}
