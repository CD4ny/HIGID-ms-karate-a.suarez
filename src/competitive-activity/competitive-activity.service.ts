import { Injectable } from '@nestjs/common';
import { CreateCompetitiveActivityDto } from './dto/create-competitive-activity.dto';
import { UpdateCompetitiveActivityDto } from './dto/update-competitive-activity.dto';

@Injectable()
export class CompetitiveActivityService {
  create(createCompetitiveActivityDto: CreateCompetitiveActivityDto) {
    return 'This action adds a new competitiveActivity';
  }

  findAll() {
    return `This action returns all competitiveActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competitiveActivity`;
  }

  update(id: number, updateCompetitiveActivityDto: UpdateCompetitiveActivityDto) {
    return `This action updates a #${id} competitiveActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} competitiveActivity`;
  }
}
