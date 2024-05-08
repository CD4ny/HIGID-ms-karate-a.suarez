import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateKumiteDto } from './dto/create-kumite.dto';
import { UpdateKumiteDto } from './dto/update-kumite.dto';

@Injectable()
export class KumiteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKumiteDto: CreateKumiteDto) {
    const { indicators, gi, compActivityId, selectedKaratecaId } =
      createKumiteDto;

    return await this.prisma.$transaction(async (prisma) => {
      const { id: compActKaratId } =
        await prisma.competitiveActivityKarateca_Kumite.findFirst({
          where: {
            activityId: compActivityId,
            karatecaId: selectedKaratecaId,
          },
        });

      const { id: kumiteId } = await prisma.kumite.create({
        data: {
          gi,
          comp_Karat_Id: compActKaratId,
        },
      });

      await prisma.indicatorOnKumite.createMany({
        data: indicators.map((indicator) => ({
          kumiteId,
          indicatorId: indicator,
        })),
      });
    });
  }

  async findAll(activityId, karatecaId) {
    const { id: compActKaratId } =
      await this.prisma.competitiveActivityKarateca_Kumite.findFirst({
        where: {
          activityId,
          karatecaId,
        },
      });

    return await this.prisma.kumite.findMany({
      where: {
        comp_Karat_Id: compActKaratId,
        deleted: false,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(kumiteId: number) {
    const res = await this.prisma.kumite.findFirst({
      where: { id: kumiteId, deleted: false },
    });

    if (res) {
      const indicatorsIds = await this.prisma.indicatorOnKumite.findMany({
        where: { kumiteId: res.id, deleted: false },
        select: { indicatorId: true },
      });

      return {
        ...res,
        indicators: indicatorsIds.map(({ indicatorId }) => indicatorId),
      };
    } else return res;
  }

  async update(id: number, updateKumiteDto: UpdateKumiteDto) {
    return await this.prisma.$transaction(async (prisma) => {
      // This is for the unused variables warning
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { indicators, compActivityId, selectedKaratecaId, ...rest } =
        updateKumiteDto;

      const res = await prisma.kumite.update({
        where: { id, deleted: false },
        data: rest,
      });

      if (res) {
        await prisma.indicatorOnKumite.updateMany({
          where: { indicatorId: { notIn: indicators }, kumiteId: id },
          data: { deleted: true },
        });

        const existingIndicatorsIds = await prisma.indicatorOnKumite.findMany({
          where: { kumiteId: id, deleted: false },
          select: { indicatorId: true },
        });

        const existingIndicatorsSet = new Set(
          existingIndicatorsIds.map(({ indicatorId }) => indicatorId),
        );

        const newIndicators = indicators
          .filter((indicator) => !existingIndicatorsSet.has(indicator))
          .map((indicator) => ({
            kumiteId: id,
            indicatorId: indicator,
          }));

        if (newIndicators.length > 0) {
          await prisma.indicatorOnKumite.createMany({
            data: newIndicators,
          });
        }
      }
    });
  }

  async remove(ids: number[]) {
    const res = await this.prisma.kumite.updateMany({
      where: { id: { in: ids } },
      data: { deleted: true },
    });

    if (res?.count > 0) {
      await this.prisma.indicatorOnKumite.updateMany({
        where: { kumiteId: { in: ids } },
        data: { deleted: true },
      });
    }

    return res;
  }
}
