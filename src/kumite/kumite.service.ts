import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateKumiteDto } from './dto/create-kumite.dto';
import { UpdateKumiteDto } from './dto/update-kumite.dto';
import { EvaluateKumiteDto } from './dto/evaluate-kumite.dto';
import { DeleteKumiteDto } from './dto/delete-kumite.dto';

@Injectable()
export class KumiteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKumiteDto: CreateKumiteDto) {
    const {
      indicators,
      filePath,
      gi,
      compActivityId,
      selectedKaratecaId,
      userId,
    } = createKumiteDto;

    return await this.prisma.$transaction(async (prisma) => {
      const { id: compActKaratId } =
        await prisma.competitiveActivityKarateca_Kumite.findFirst({
          where: {
            activityId: parseInt(compActivityId),
            karatecaId: parseInt(selectedKaratecaId),
            owner: userId,
          },
        });

      const { id: kumiteId } = await prisma.kumite.create({
        data: {
          gi,
          owner: userId,
          comp_Karat_Id: compActKaratId,
          video: filePath,
        },
      });

      const parsedIndicators = indicators
        .split(',')
        .map((indicator) => parseInt(indicator));

      await prisma.indicatorOnKumite.createMany({
        data: parsedIndicators.map((indicator) => ({
          kumiteId,
          indicatorId: indicator,
          owner: userId,
        })),
      });
    });
  }

  async findAll(activityId, karatecaId, owner: string) {
    const { id: compActKaratId } =
      await this.prisma.competitiveActivityKarateca_Kumite.findFirst({
        where: {
          activityId,
          karatecaId,
          owner,
        },
      });

    return await this.prisma.kumite.findMany({
      where: {
        comp_Karat_Id: compActKaratId,
        deleted: false,
        owner,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(kumiteId: number, owner: string) {
    const res = await this.prisma.kumite.findFirst({
      where: { id: kumiteId, deleted: false, owner },
    });

    if (res) {
      const indicatorsIds = await this.prisma.indicatorOnKumite.findMany({
        where: { kumiteId: res.id, deleted: false, owner },
        select: { indicatorId: true },
      });

      return {
        ...res,
        indicators: indicatorsIds.map(({ indicatorId }) => indicatorId),
      };
    } else return res;
  }

  async findIndicatorsByKumiteId(kumiteId: number, owner: string) {
    const res = await this.prisma.indicatorOnKumite.findMany({
      where: { kumiteId, owner },
      select: { indicatorId: true, value: true, deleted: true },
    });

    if (res.length > 0) {
      const indicatorsIds = res.map(({ indicatorId }) => indicatorId);

      const indicators = await this.prisma.indicator.findMany({
        where: { id: { in: indicatorsIds }, owner },
        select: {
          id: true,
          code: true,
          name: true,
          type: true,
          actionType: true,
          deleted: true,
        },
      });

      const dataToReturn = [];
      res.forEach((item) => {
        const indicator = indicators.find(
          (indicator) => indicator.id === item.indicatorId,
        );

        if (indicator && !item.deleted) {
          dataToReturn.push({ ...indicator, value: item.value });
        }
      });

      return dataToReturn;
    }

    return res;
  }

  async evaluate(id: number, evaluateKumiteDto: EvaluateKumiteDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { indicators, evaluation, userId, ...rest } = evaluateKumiteDto;

      if (evaluation) {
        await prisma.kumite.update({
          where: { id, deleted: false, owner: userId },
          data: { evaluation },
        });
      } else {
        const res = await prisma.kumite.update({
          where: { id, deleted: false, owner: userId },
          data: rest,
        });

        if (res) {
          const indicatorsOnKumiteIds = await prisma.indicatorOnKumite.findMany(
            {
              where: { kumiteId: id, deleted: false, owner: userId },
              select: { id: true, indicatorId: true, kumiteId: true },
            },
          );

          const parsedIndicatorOnKumite = {};
          for (const item of indicatorsOnKumiteIds) {
            parsedIndicatorOnKumite[
              item.indicatorId.toString() + item.kumiteId.toString()
            ] = item.id;
          }

          const cleanedIndicators = indicators.filter(
            (indicator) =>
              parsedIndicatorOnKumite[indicator.id.toString() + id.toString()],
          );

          for (const indicator of cleanedIndicators) {
            await prisma.indicatorOnKumite.update({
              where: {
                owner: userId,
                id: parsedIndicatorOnKumite[
                  indicator.id.toString() + id.toString()
                ],
                kumiteId: id,
                indicatorId: indicator.id,
                deleted: false,
              },
              data: {
                value: indicator.value,
              },
            });
          }
        }
      }
    });
  }

  async update(id: number, updateKumiteDto: UpdateKumiteDto) {
    return await this.prisma.$transaction(async (prisma) => {
      // This is for the unused variables warning
      const {
        indicators,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        compActivityId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        selectedKaratecaId,
        userId: owner,
        ...rest
      } = updateKumiteDto;

      const parsedIndicators = indicators
        .split(',')
        .map((indicator) => parseInt(indicator));

      const res = await prisma.kumite.update({
        where: { id, deleted: false, owner },
        data: rest,
      });

      if (res) {
        await prisma.indicatorOnKumite.updateMany({
          where: {
            indicatorId: { notIn: parsedIndicators },
            kumiteId: id,
            owner,
          },
          data: { deleted: true },
        });

        const existingIndicatorsIds = await prisma.indicatorOnKumite.findMany({
          where: { kumiteId: id, deleted: false, owner },
          select: { indicatorId: true },
        });

        const existingIndicatorsSet = new Set(
          existingIndicatorsIds.map(({ indicatorId }) => indicatorId),
        );

        const newIndicators = parsedIndicators
          .filter((indicator) => !existingIndicatorsSet.has(indicator))
          .map((indicator) => ({
            kumiteId: id,
            indicatorId: indicator,
            owner,
          }));

        if (newIndicators.length > 0) {
          await prisma.indicatorOnKumite.createMany({
            data: newIndicators,
          });
        }
      }
    });
  }

  async remove(deleteKumiteDto: DeleteKumiteDto) {
    const { ids, userId } = deleteKumiteDto;
    const res = await this.prisma.kumite.updateMany({
      where: { id: { in: ids }, owner: userId },
      data: { deleted: true },
    });

    if (res?.count > 0) {
      await this.prisma.indicatorOnKumite.updateMany({
        where: { kumiteId: { in: ids }, owner: userId },
        data: { deleted: true },
      });
    }

    return res;
  }
}
