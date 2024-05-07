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
  async findAll() {
    return await this.competitiveActivityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.competitiveActivityService.findOne(id);
    if (!res) {
      throw new HttpException(
        'Competitive activity not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return res;
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
  async remove(@Body('ids') ids: number[]) {
    return await this.competitiveActivityService.remove(ids);
  }
}
