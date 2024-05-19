import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CompetitiveActivityService } from './competitive-activity.service';
import { CreateCompetitiveActivityDto } from './dto/create-competitive-activity.dto';
import { UpdateCompetitiveActivityDto } from './dto/update-competitive-activity.dto';
import { AppDto } from 'src/app.dto';
import { DeleteCompetitiveActivityDto } from './dto/delete-competitive-activity.dto';

@Controller('competitive-activity')
export class CompetitiveActivityController {
  constructor(
    private readonly competitiveActivityService: CompetitiveActivityService,
  ) {}

  @Post()
  async create(
    @Body() createCompetitiveActivityDto: CreateCompetitiveActivityDto,
  ) {
    return await this.competitiveActivityService.create(
      createCompetitiveActivityDto,
    );
  }

  @Get()
  async findAll(@Body() body: AppDto) {
    return await this.competitiveActivityService.findAll(body.userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Body() body: AppDto) {
    const res = await this.competitiveActivityService.findOne(id, body.userId);
    if (!res) {
      throw new HttpException(
        'Competitive activity not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return res;
  }

  @Get(':id/karatecas')
  async findKaratecas(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AppDto,
  ) {
    return await this.competitiveActivityService.findKaratecas(id, body.userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompetitiveActivityDto: UpdateCompetitiveActivityDto,
  ) {
    return await this.competitiveActivityService.update(
      id,
      updateCompetitiveActivityDto,
    );
  }

  @Delete()
  async remove(@Body() deleteComActDto: DeleteCompetitiveActivityDto) {
    return await this.competitiveActivityService.remove(deleteComActDto);
  }
}
