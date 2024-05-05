import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIndicatorDto {
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
