import { Injectable } from '@nestjs/common';
import { CreateKumiteDto } from './dto/create-kumite.dto';
import { UpdateKumiteDto } from './dto/update-kumite.dto';

@Injectable()
export class KumiteService {
  create(createKumiteDto: CreateKumiteDto) {
    return 'This action adds a new kumite';
  }

  findAll() {
    return `This action returns all kumite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kumite`;
  }

  update(id: number, updateKumiteDto: UpdateKumiteDto) {
    return `This action updates a #${id} kumite`;
  }

  remove(id: number) {
    return `This action removes a #${id} kumite`;
  }
}
