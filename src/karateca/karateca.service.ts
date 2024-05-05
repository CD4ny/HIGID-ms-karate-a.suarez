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
    return await this.prisma.karateca.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.karateca.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateKaratecaDto: UpdateKaratecaDto) {
    return await this.prisma.karateca.update({
      where: { id },
      data: updateKaratecaDto,
    });
  }

  async remove(ids: number[]) {
    return await this.prisma.karateca.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
