import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';

@Injectable()
export class IndicatorService {
  constructor(private prisma: PrismaService) {}

  async create(createIndicatorDto: CreateIndicatorDto) {
    return await this.prisma.indicator.create({
      data: createIndicatorDto,
    });
  }

  async findAll() {
    return await this.prisma.indicator.findMany({ where: { deleted: false } });
  }

  async findOne(code: string) {
    return await this.prisma.indicator.findFirst({
      where: { code, deleted: false },
    });
  }

  async update(id: number, updateIndicatorDto: UpdateIndicatorDto) {
    return await this.prisma.indicator.update({
      where: { id, deleted: false },
      data: updateIndicatorDto,
    });
  }

  async remove(ids: number[]) {
    return await this.prisma.indicator.updateMany({
      where: { id: { in: ids } },
      data: { deleted: true },
    });
  }
}
