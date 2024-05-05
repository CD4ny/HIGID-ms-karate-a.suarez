import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KaratecaService } from './karateca.service';
import { CreateKaratecaDto } from './dto/create-karateca.dto';
import { UpdateKaratecaDto } from './dto/update-karateca.dto';

@Controller('karateca')
export class KaratecaController {
  constructor(private readonly karatecaService: KaratecaService) {}

  @Post()
  create(@Body() createKaratecaDto: CreateKaratecaDto) {
    return this.karatecaService.create(createKaratecaDto);
  }

  @Get()
  findAll() {
    return this.karatecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.karatecaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKaratecaDto: UpdateKaratecaDto) {
    return this.karatecaService.update(+id, updateKaratecaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.karatecaService.remove(+id);
  }
}
