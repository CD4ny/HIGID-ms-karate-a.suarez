import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateCompetitiveActivityDto } from './dto/create-competitive-activity.dto';
import { UpdateCompetitiveActivityDto } from './dto/update-competitive-activity.dto';
import { DeleteCompetitiveActivityDto } from './dto/delete-competitive-activity.dto';

@Injectable()
export class CompetitiveActivityService {
  constructor(private prisma: PrismaService) {}

  async create(createCompetitiveActivityDto: CreateCompetitiveActivityDto) {
    const { desc, endDate, startDate, type, userId, karatecasIds } =
      createCompetitiveActivityDto;

    const { id: compActivityId } = await this.prisma.competitiveActivity.create(
      {
        data: {
          desc,
          endDate,
          startDate,
          type,
          owner: userId,
        },
      },
    );

    await this.prisma.competitiveActivityKarateca_Kumite.createMany({
      data: karatecasIds.map((karatecaId) => ({
        activityId: compActivityId,
        karatecaId,
        owner: userId,
      })),
    });
  }

  async findAll(owner: string) {
    return await this.prisma.competitiveActivity.findMany({
      where: { deleted: false, owner },
    });
  }

  async findOne(id: number, owner: string) {
    const res = await this.prisma.competitiveActivity.findUnique({
      where: { id, deleted: false, owner },
    });

    if (res) {
      const karatecasIds =
        await this.prisma.competitiveActivityKarateca_Kumite.findMany({
          where: { activityId: res.id, deleted: false },
          select: { karatecaId: true },
        });

      return {
        ...res,
        karatecasIds: karatecasIds.map(({ karatecaId }) => karatecaId),
      };
    } else return res;
  }

  async findKaratecas(id: number, owner: string) {
    const res = await this.prisma.competitiveActivityKarateca_Kumite.findMany({
      where: { activityId: id, owner },
      select: { karatecaId: true, deleted: true },
    });

    if (res.length > 0) {
      const karatecasIds = res.map(({ karatecaId }) => karatecaId);

      const karatecas = await this.prisma.karateca.findMany({
        where: { id: { in: karatecasIds }, owner },
      });

      const dataToReturn = [];

      res.forEach((item) => {
        const karateca = karatecas.find(
          (karateca) => karateca.id === item.karatecaId,
        );

        if (karateca && !item.deleted) {
          dataToReturn.push(karateca);
        }
      });

      return dataToReturn;
    }

    return res;
  }

  async update(
    id: number,
    updateCompetitiveActivityDto: UpdateCompetitiveActivityDto,
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const { karatecasIds, userId, ...rest } = updateCompetitiveActivityDto;

      const res = await prisma.competitiveActivity.update({
        where: { id, deleted: false, owner: userId },
        data: rest,
      });

      if (res) {
        const karatecasInCompAct =
          await prisma.competitiveActivityKarateca_Kumite.findMany({
            where: { activityId: id, deleted: false, owner: userId },
            select: { karatecaId: true },
          });

        const deletedKaratecasIds = await prisma.karateca.findMany({
          where: {
            id: { in: karatecasInCompAct.map((item) => item.karatecaId) },
            deleted: true,
            owner: userId,
          },
          select: { id: true },
        });

        await prisma.competitiveActivityKarateca_Kumite.updateMany({
          where: {
            owner: userId,
            karatecaId: {
              notIn: [
                ...karatecasIds,
                ...deletedKaratecasIds.map((item) => item.id),
              ],
            },
            activityId: id,
          },
          data: { deleted: true },
        });

        const existingKaratecasIds =
          await prisma.competitiveActivityKarateca_Kumite.findMany({
            where: { activityId: id, deleted: false, owner: userId },
            select: { karatecaId: true },
          });

        const existingKaratecasIdsSet = new Set(
          existingKaratecasIds.map(({ karatecaId }) => karatecaId),
        );
        const newKaratecasIds = karatecasIds
          .filter((karatecaId) => !existingKaratecasIdsSet.has(karatecaId))
          .map((karatecaId) => ({ activityId: id, karatecaId, owner: userId }));

        if (newKaratecasIds.length > 0) {
          await prisma.competitiveActivityKarateca_Kumite.createMany({
            data: newKaratecasIds,
          });
        }
      }

      return res;
    });
  }

  async remove(deleteComActDto: DeleteCompetitiveActivityDto) {
    const { ids, userId } = deleteComActDto;
    const res = await this.prisma.competitiveActivity.updateMany({
      where: { id: { in: ids }, owner: userId },
      data: { deleted: true },
    });

    if (res?.count > 0) {
      await this.prisma.competitiveActivityKarateca_Kumite.updateMany({
        where: { activityId: { in: ids }, owner: userId },
        data: { deleted: true },
      });
    }

    return res;
  }
}
