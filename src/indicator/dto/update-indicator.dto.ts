import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from 'class-validator';
import { CreateIndicatorDto } from './create-indicator.dto';

export class UpdateIndicatorDto extends PartialType(CreateIndicatorDto) {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  actionType: string;
}
