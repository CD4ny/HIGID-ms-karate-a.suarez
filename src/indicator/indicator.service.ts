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
    return await this.prisma.indicator.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.indicator.findUnique({
      where: { id },
    });
  }

  async update(updateIndicatorDto: UpdateIndicatorDto) {
    return await this.prisma.indicator.update({
      where: { id: updateIndicatorDto.id },
      data: updateIndicatorDto,
    });
  }

  async remove(ids: string[]) {
    return await this.prisma.indicator.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
