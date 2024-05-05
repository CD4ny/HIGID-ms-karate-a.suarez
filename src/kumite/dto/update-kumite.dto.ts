import { PartialType } from '@nestjs/mapped-types';
import { CreateKumiteDto } from './create-kumite.dto';

export class UpdateKumiteDto extends PartialType(CreateKumiteDto) {}
