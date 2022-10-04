import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivilageService } from './privilage.service';
import { CreatePrivilageDto, UpdatePrivilageDto, DeletePrivilageDto } from './dto/privilage.dto';

@Controller('privilage')
export class PrivilageController {
  constructor(private readonly privilageService: PrivilageService) { }

  @Post()
  create(@Body() createPrivilageDto: CreatePrivilageDto) {
    // return this.privilageService.create(createPrivilageDto);
  }

  @Get()
  findAll() {
    return this.privilageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privilageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrivilageDto: UpdatePrivilageDto) {
    // return this.privilageService.update(+id, updatePrivilageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privilageService.remove(+id);
  }
}
