import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';

import { IndicatorService } from './indicator.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { AppDto } from 'src/app.dto';
import { DeleteIndicatorDto } from './dto/delete-indicator.dto';

@Controller('indicator')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @Post()
  async create(@Body() createIndicatorDto: CreateIndicatorDto) {
    const { code, userId } = createIndicatorDto;
    const indicator = await this.indicatorService.findOne(code, userId);
    if (indicator) {
      throw new HttpException(
        'Un indicador con este código ya existe',
        HttpStatus.CONFLICT,
      );
    }

    return await this.indicatorService.create(createIndicatorDto);
  }

  @Get()
  async findAll(@Body() body: AppDto) {
    return await this.indicatorService.findAll(body.userId);
  }

  @Get(':code')
  async findOne(@Param('code') code: string, @Body() body: AppDto) {
    const res = await this.indicatorService.findOne(code, body.userId);
    if (!res) {
      throw new HttpException('Indicador no encontrado', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() updateIndicatorDto: UpdateIndicatorDto,
  ) {
    try {
      return await this.indicatorService.update(id, updateIndicatorDto);
    } catch (error) {
      if (error.code === 'P2025')
        throw new HttpException(
          'Indicador no encontrado',
          HttpStatus.NOT_FOUND,
        );

      throw new HttpException(
        'Error interno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  async remove(@Body() deleteIndicatorsDto: DeleteIndicatorDto) {
    return await this.indicatorService.remove(deleteIndicatorsDto);
  }
}
