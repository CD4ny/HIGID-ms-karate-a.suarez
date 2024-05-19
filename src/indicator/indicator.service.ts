import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { DeleteIndicatorDto } from './dto/delete-indicator.dto';

@Injectable()
export class IndicatorService {
  constructor(private prisma: PrismaService) {}

  async create(createIndicatorDto: CreateIndicatorDto) {
    const { userId, ...rest } = createIndicatorDto;
    return await this.prisma.indicator.create({
      data: { ...rest, owner: userId },
    });
  }

  async findAll(owner: string) {
    return await this.prisma.indicator.findMany({
      where: { deleted: false, owner },
    });
  }

  async findOne(code: string, owner) {
    return await this.prisma.indicator.findFirst({
      where: { code, deleted: false, owner },
    });
  }

  async update(id: number, updateIndicatorDto: UpdateIndicatorDto) {
    const { userId, ...rest } = updateIndicatorDto;
    return await this.prisma.indicator.update({
      where: { id, deleted: false, owner: userId },
      data: rest,
    });
  }

  async remove(deleteIndicatorsDto: DeleteIndicatorDto) {
    const { ids, userId } = deleteIndicatorsDto;
    return await this.prisma.indicator.updateMany({
      where: { id: { in: ids }, owner: userId },
      data: { deleted: true },
    });
  }
}
