import { Injectable } from '@nestjs/common';
import { CreateKaratecaDto } from './dto/create-karateca.dto';
import { UpdateKaratecaDto } from './dto/update-karateca.dto';

@Injectable()
export class KaratecaService {
  create(createKaratecaDto: CreateKaratecaDto) {
    return 'This action adds a new karateca';
  }

  findAll() {
    return `This action returns all karateca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} karateca`;
  }

  update(id: number, updateKaratecaDto: UpdateKaratecaDto) {
    return `This action updates a #${id} karateca`;
  }

  remove(id: number) {
    return `This action removes a #${id} karateca`;
  }
}
