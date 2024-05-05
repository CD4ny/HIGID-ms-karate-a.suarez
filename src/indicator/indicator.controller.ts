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
} from '@nestjs/common';

import { IndicatorService } from './indicator.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';

@Controller('indicator')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @Post()
  async create(@Body() createIndicatorDto: CreateIndicatorDto) {
    const { id } = createIndicatorDto;
    const indicator = await this.indicatorService.findOne(id);
    if (indicator) {
      throw new HttpException(
        'Un indicador con este ID ya existe',
        HttpStatus.CONFLICT,
      );
    }

    return await this.indicatorService.create(createIndicatorDto);
  }

  @Get()
  async findAll() {
    return await this.indicatorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.indicatorService.findOne(id);
    if (!res) {
      throw new HttpException('Indicador no encontrado', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Patch()
  async update(@Body() updateIndicatorDto: UpdateIndicatorDto) {
    try {
      return await this.indicatorService.update(updateIndicatorDto);
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
  async remove(@Body('ids') ids: string[]) {
    return await this.indicatorService.remove(ids);
  }
}
