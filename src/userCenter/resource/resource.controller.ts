import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto, UpdateResourceDto, DeleteResourceDto, ListBySystemIdDto } from './dto/resource.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('权限资源')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) { }

  @ApiOperation({
    summary: '创建新资源'
  })
  @Post('create')
  async create(@Body() createResourceDto: CreateResourceDto) {
    const foundResource = await this.resourceService.findByKey(createResourceDto.key)

    if (foundResource) {
      throw new BusinessException('资源key已存在')
    }

    return this.resourceService.create(createResourceDto);
  }

  @ApiOperation({
    summary: '修改资源信息'
  })
  @Post('/update')
  async update(@Body() updateResourceDto: UpdateResourceDto) {
    const foundResource = await this.resourceService.findById(updateResourceDto.id)
    if (!foundResource) {
      throw new BusinessException('未找到资源')
    }

    const allowUpdateFields = {
      name: updateResourceDto.name,
    }

    return this.resourceService.update({ ...foundResource, ...allowUpdateFields });
  }

  @ApiOperation({
    summary: '删除资源'
  })
  @Post('/delete')
  async remove(@Body() deleteDto: DeleteResourceDto) {
    return this.resourceService.remove(deleteDto.id);
  }

  @ApiOperation({
    summary: '资源列表',
    description: '根据角色名称查询',
  })
  @Post('/listBySystemId')
  async listBySystemId(
    @Body() listBySystemDto: ListBySystemIdDto
  ) {
    return this.resourceService.listBySystemId(listBySystemDto.systemId)
  }
}
