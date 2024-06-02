import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { KumiteService } from './kumite.service';
import { CreateKumiteDto } from './dto/create-kumite.dto';
import { UpdateKumiteDto } from './dto/update-kumite.dto';
import { EvaluateKumiteDto } from './dto/evaluate-kumite.dto';
import { AppDto } from 'src/app.dto';
import { DeleteKumiteDto } from './dto/delete-kumite.dto';
import { GetKumiteQueryParamsDto } from './dto/get-kumite-queryparams.dto';

@Controller('kumite')
export class KumiteController {
  constructor(private readonly kumiteService: KumiteService) {}

  @Post()
  async create(@Body() createKumiteDto: CreateKumiteDto) {
    return await this.kumiteService.create(createKumiteDto);
  }

  @Get(':kumiteId/indicators')
  async getIndicators(
    @Param('kumiteId', ParseIntPipe) kumiteId: number,
    @Body() body: AppDto,
  ) {
    return await this.kumiteService.findIndicatorsByKumiteId(
      kumiteId,
      body.userId,
    );
  }

  @Get()
  async findKumites(
    @Query() query: GetKumiteQueryParamsDto,
    @Body() body: AppDto,
  ) {
    const { compAct: qCompAct, karateca: qKarateca, kumite: qKumite } = query;
    const { userId } = body;
    const activityId = qCompAct && parseInt(qCompAct);
    const karatecaId = qKarateca && parseInt(qKarateca);
    const kumite = qKumite && parseInt(qKumite);

    if (activityId || karatecaId) {
      return await this.kumiteService.findAll({
        activityId,
        karatecaId,
        owner: userId,
      });
    }

    if (kumite) {
      const res = await this.kumiteService.findOne(kumite, userId);

      if (!res) {
        throw new HttpException('Kumite not found', HttpStatus.NOT_FOUND);
      }

      return res;
    }

    throw new HttpException(
      'Must provide correct parameters',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get(':kumiteId')
  async findOne(
    @Param('kumiteId', ParseIntPipe) kumiteId: number,
    @Body() body: AppDto,
  ) {
    const res = await this.kumiteService.findOne(kumiteId, body.userId);

    if (!res) {
      throw new HttpException('Kumite not found', HttpStatus.NOT_FOUND);
    }

    return res;
  }

  @Patch(':id/evaluate')
  async evaluate(
    @Param('id', ParseIntPipe) id: number,
    @Body() evaluateKumiteDto: EvaluateKumiteDto,
  ) {
    const { evaluation, indicators } = evaluateKumiteDto;
    if (!evaluation && !indicators)
      throw new HttpException(
        'Indicators are required',
        HttpStatus.BAD_REQUEST,
      );

    return await this.kumiteService.evaluate(id, evaluateKumiteDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKumiteDto: UpdateKumiteDto,
  ) {
    return await this.kumiteService.update(id, updateKumiteDto);
  }

  @Delete()
  async remove(@Body() deleteKumiteDto: DeleteKumiteDto) {
    return await this.kumiteService.remove(deleteKumiteDto);
  }
}
