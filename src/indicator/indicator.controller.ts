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

    return this.indicatorService.create(createIndicatorDto);
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
    return await this.indicatorService.update(updateIndicatorDto);
  }

  @Delete()
  async remove(@Body('ids') ids: string[]) {
    return await this.indicatorService.remove(ids);
  }
}
