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
} from '@nestjs/common';
import { KumiteService } from './kumite.service';
import { CreateKumiteDto } from './dto/create-kumite.dto';
import { UpdateKumiteDto } from './dto/update-kumite.dto';

@Controller('kumite')
export class KumiteController {
  constructor(private readonly kumiteService: KumiteService) {}

  @Post()
  async create(@Body() createKumiteDto: CreateKumiteDto) {
    return await this.kumiteService.create(createKumiteDto);
  }

  @Get(':activityId/:karatecaId')
  async findAll(
    @Param('activityId', ParseIntPipe) activityId: number,
    @Param('karatecaId', ParseIntPipe) karatecaId: number,
  ) {
    return await this.kumiteService.findAll(activityId, karatecaId);
  }

  @Get(':kumiteId')
  async findOne(@Param('kumiteId', ParseIntPipe) kumiteId: number) {
    const res = await this.kumiteService.findOne(kumiteId);

    if (!res) {
      throw new HttpException('Kumite not found', HttpStatus.NOT_FOUND);
    }

    return res;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKumiteDto: UpdateKumiteDto,
  ) {
    return await this.kumiteService.update(id, updateKumiteDto);
  }

  @Delete()
  async remove(@Body('ids') ids: number[]) {
    return await this.kumiteService.remove(ids);
  }
}
