import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetitiveActivityService } from './competitive-activity.service';
import { CreateCompetitiveActivityDto } from './dto/create-competitive-activity.dto';
import { UpdateCompetitiveActivityDto } from './dto/update-competitive-activity.dto';

@Controller('competitive-activity')
export class CompetitiveActivityController {
  constructor(private readonly competitiveActivityService: CompetitiveActivityService) {}

  @Post()
  create(@Body() createCompetitiveActivityDto: CreateCompetitiveActivityDto) {
    return this.competitiveActivityService.create(createCompetitiveActivityDto);
  }

  @Get()
  findAll() {
    return this.competitiveActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitiveActivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetitiveActivityDto: UpdateCompetitiveActivityDto) {
    return this.competitiveActivityService.update(+id, updateCompetitiveActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitiveActivityService.remove(+id);
  }
}
