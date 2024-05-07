import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateCompetitiveActivityDto } from './dto/create-competitive-activity.dto';
import { UpdateCompetitiveActivityDto } from './dto/update-competitive-activity.dto';

@Injectable()
export class CompetitiveActivityService {
  constructor(private prisma: PrismaService) {}

  async create(createCompetitiveActivityDto: CreateCompetitiveActivityDto) {
    const { desc, endDate, startDate, type, karatecasIds } =
      createCompetitiveActivityDto;

    const { id: compActivityId } = await this.prisma.competitiveActivity.create(
      {
        data: {
          desc,
          endDate,
          startDate,
          type,
        },
      },
    );

    await this.prisma.competitiveActivityKarateca_Kumite.createMany({
      data: karatecasIds.map((karatecaId) => ({
        activityId: compActivityId,
        karatecaId,
      })),
    });
  }

  async findAll() {
    return await this.prisma.competitiveActivity.findMany({
      where: { deleted: false },
    });
  }

  async findOne(id: number) {
    const res = await this.prisma.competitiveActivity.findUnique({
      where: { id, deleted: false },
    });

    if (res) {
      const karatecasIds =
        await this.prisma.competitiveActivityKarateca_Kumite.findMany({
          where: { activityId: res.id },
          select: { karatecaId: true },
        });

      return {
        ...res,
        karatecasIds: karatecasIds.map(({ karatecaId }) => karatecaId),
      };
    } else return res;
  }

  async update(
    id: number,
    updateCompetitiveActivityDto: UpdateCompetitiveActivityDto,
  ) {
    const { desc, endDate, startDate, type, karatecasIds } =
      updateCompetitiveActivityDto;

    const res = await this.prisma.competitiveActivity.update({
      where: { id, deleted: false },
      data: {
        desc,
        endDate,
        startDate,
        type,
      },
    });

    if (res) {
      await this.prisma.competitiveActivityKarateca_Kumite.deleteMany({
        where: { karatecaId: { notIn: karatecasIds }, activityId: id },
      });
    }

    return res;
  }

  async remove(ids: number[]) {
    return await this.prisma.competitiveActivity.updateMany({
      where: { id: { in: ids } },
      data: { deleted: true },
    });
  }
}
