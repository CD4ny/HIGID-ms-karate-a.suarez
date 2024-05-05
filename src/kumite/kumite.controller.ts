import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KumiteService } from './kumite.service';
import { CreateKumiteDto } from './dto/create-kumite.dto';
import { UpdateKumiteDto } from './dto/update-kumite.dto';

@Controller('kumite')
export class KumiteController {
  constructor(private readonly kumiteService: KumiteService) {}

  @Post()
  create(@Body() createKumiteDto: CreateKumiteDto) {
    return this.kumiteService.create(createKumiteDto);
  }

  @Get()
  findAll() {
    return this.kumiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kumiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKumiteDto: UpdateKumiteDto) {
    return this.kumiteService.update(+id, updateKumiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kumiteService.remove(+id);
  }
}
