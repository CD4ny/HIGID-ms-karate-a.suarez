import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateKaratecaDto } from './dto/create-karateca.dto';
import { UpdateKaratecaDto } from './dto/update-karateca.dto';

@Injectable()
export class KaratecaService {
  constructor(private prisma: PrismaService) {}

  async create(createKaratecaDto: CreateKaratecaDto) {
    return await this.prisma.karateca.create({
      data: createKaratecaDto,
    });
  }

  async findAll() {
    return await this.prisma.karateca.findMany({ where: { deleted: false } });
  }

  async findOne(id: number) {
    return await this.prisma.karateca.findUnique({
      where: { id, deleted: false },
    });
  }

  async update(id: number, updateKaratecaDto: UpdateKaratecaDto) {
    return await this.prisma.karateca.update({
      where: { id, deleted: false },
      data: updateKaratecaDto,
    });
  }

  async remove(ids: number[]) {
    return await this.prisma.karateca.updateMany({
      where: { id: { in: ids } },
      data: { deleted: true },
    });
  }
}
