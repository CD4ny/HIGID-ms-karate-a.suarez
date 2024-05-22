import { IsNotEmpty, IsString } from 'class-validator';

export class AppDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
