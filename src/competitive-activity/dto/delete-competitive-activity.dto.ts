import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AppDto } from 'src/app.dto';

export class DeleteCompetitiveActivityDto extends PartialType(AppDto) {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  ids: number[];
}
