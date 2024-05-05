import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetitiveActivityDto } from './create-competitive-activity.dto';

export class UpdateCompetitiveActivityDto extends PartialType(CreateCompetitiveActivityDto) {}
