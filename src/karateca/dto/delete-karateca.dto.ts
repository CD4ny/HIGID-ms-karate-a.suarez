import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AppDto } from 'src/app.dto';

export class DeleteKaratecaDto extends PartialType(AppDto) {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  ids: number[];
}
