import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { KaratecaService } from './karateca.service';
import { CreateKaratecaDto } from './dto/create-karateca.dto';
import { UpdateKaratecaDto } from './dto/update-karateca.dto';
import { AppDto } from 'src/app.dto';
import { DeleteKaratecaDto } from './dto/delete-karateca.dto';

@Controller('karateca')
export class KaratecaController {
  constructor(private readonly karatecaService: KaratecaService) {}

  @Post()
  async create(@Body() createKaratecaDto: CreateKaratecaDto) {
    return await this.karatecaService.create(createKaratecaDto);
  }

  @Get()
  async findAll(@Body() body: AppDto) {
    return await this.karatecaService.findAll(body.userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Body() body: AppDto) {
    const res = await this.karatecaService.findOne(id, body.userId);
    if (!res) {
      throw new HttpException('Karateca no encontrado', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKaratecaDto: UpdateKaratecaDto,
  ) {
    try {
      return await this.karatecaService.update(id, updateKaratecaDto);
    } catch (error) {
      if (error.code === 'P2025')
        throw new HttpException('Karateca no encontrado', HttpStatus.NOT_FOUND);

      throw new HttpException(
        'Error interno',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  async remove(@Body() deleteKaratecaDto: DeleteKaratecaDto) {
    return await this.karatecaService.remove(deleteKaratecaDto);
  }
}
