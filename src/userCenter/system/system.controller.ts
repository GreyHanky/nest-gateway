import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { DeleteSystemDto } from './dto/delete-system.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayloadUser } from '@/helper';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('系统')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) { }

  @ApiOperation({
    summary: '创建新系统'
  })
  @Post('/create')
  create(
    @Body() createSystemDto: CreateSystemDto,
    @PayloadUser() user: Payload
  ) {
    return this.systemService.create({
      ...createSystemDto,
      creatorName: user.name,
      creatorId: user.userId
    });
  }

  @ApiOperation({
    summary: '创建新系统'
  })
  @Post('/update')
  async update(@Body() updateSystemDto: UpdateSystemDto) {
    const foundSystem = await this.systemService.findOne(updateSystemDto.id)
    if (!foundSystem) {
      throw new BusinessException('没有找到系统')
    }
    return this.systemService.update({ ...foundSystem, ...updateSystemDto });
  }

  @Post('/list')
  findAll() {
    return this.systemService.findAll();
  }

  @Post('/delete')
  remove(@Body() dot: DeleteSystemDto) {
    return this.systemService.remove(dot.id);
  }
}
