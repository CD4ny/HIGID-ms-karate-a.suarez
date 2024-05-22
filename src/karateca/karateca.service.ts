import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateKaratecaDto } from './dto/create-karateca.dto';
import { UpdateKaratecaDto } from './dto/update-karateca.dto';
import { DeleteKaratecaDto } from './dto/delete-karateca.dto';

@Injectable()
export class KaratecaService {
  constructor(private prisma: PrismaService) {}

  async create(createKaratecaDto: CreateKaratecaDto) {
    const { userId, filePath: pic, ...rest } = createKaratecaDto;
    return await this.prisma.karateca.create({
      data: { ...rest, owner: userId, pic },
    });
  }

  async findAll(owner) {
    return await this.prisma.karateca.findMany({
      where: { deleted: false, owner },
    });
  }

  async findOne(id: number, owner) {
    return await this.prisma.karateca.findUnique({
      where: { id, deleted: false, owner },
    });
  }

  async update(id: number, updateKaratecaDto: UpdateKaratecaDto) {
    const { userId, filePath, fileChanged, ...rest } = updateKaratecaDto;

    const data = { ...rest };

    if (!filePath && Boolean(fileChanged)) data['pic'] = null;
    else if (filePath) data['pic'] = filePath;

    return await this.prisma.karateca.update({
      where: { id, deleted: false, owner: userId },
      data,
    });
  }

  async remove(deleteKaratecaDto: DeleteKaratecaDto) {
    const { ids, userId } = deleteKaratecaDto;
    return await this.prisma.karateca.updateMany({
      where: { id: { in: ids }, owner: userId },
      data: { deleted: true },
    });
  }
}
