import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivilageService } from './privilege.service';
import { CreatePrivilegeDto, UpdatePrivilegeDto, DeletePrivilegeDto, DisablePrivilegeDto, PrivilegeListWithPaginationDto, ListAllPrivilegeDto } from './dto/privilege.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Privilege } from './entities/privilege.mysql.entity';
import { ResourceService } from '../resource/resource.service';
import { SystemService } from '../system/system.service';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('权限')
@Controller('privilege')
export class PrivilageController {
  constructor(
    private readonly privilageService: PrivilageService,
    private readonly resourceService: ResourceService,
    private readonly systemService: SystemService,

  ) { }

  @ApiOperation({
    summary: '创建权限'
  })
  @Post('/create')
  async create(@Body() createPrivilageDto: CreatePrivilegeDto) {
    const privilege: Privilege = {
      systemId: createPrivilageDto.systemId,
      name: createPrivilageDto.name,
      resourceKey: createPrivilageDto.resourceKey,
      action: createPrivilageDto.action,
      description: createPrivilageDto.description
    }

    const resource = await this.resourceService.findByKey(privilege.resourceKey);
    if (!resource) {
      throw new BusinessException('未找到资源key:' + privilege.resourceKey)
    }

    return this.privilageService.create(privilege);
  }

  @ApiOperation({
    summary: '修改权限'
  })
  @Post('/update')
  update(
    @Body() updatePrivilageDto: UpdatePrivilegeDto
  ) {

    const updatePrivilege: Privilege = {
      systemId: updatePrivilageDto.systemId,
      name: updatePrivilageDto.name,
      resourceKey: updatePrivilageDto.resourceKey,
      action: updatePrivilageDto.action,
      description: updatePrivilageDto.description
    }

    const privilege = this.privilageService.findByid(updatePrivilageDto.id);
    if (!privilege) {
      throw new BusinessException('未找到id为:' + updatePrivilege.id + '的权限')
    }

    this.privilageService.update({ ...privilege, ...updatePrivilege })
  }

  @ApiOperation({
    summary: '删除权限'
  })
  @Post('/delete')
  remove(@Body() dto: DeletePrivilegeDto) {
    return this.privilageService.remove(dto.privilageId);
  }


  @Post('/changeStatus')
  async changeStatus(@Body() dto: DisablePrivilegeDto) {
    const privilege = await this.privilageService.findByid(dto.privilegeId);

    if (!privilege) {
      throw new BusinessException('未找到id为:' + dto.privilegeId + '的权限')
    }

    return this.privilageService.update({ ...privilege, status: dto.status })
  }


  @ApiOperation({
    summary: '权限列表（分页）',
    description: '根据权限名称查询',
  })
  @Post('/list/pagination')
  async listWithPagination(@Body() dto: PrivilegeListWithPaginationDto) {
    const { page, ...searchParams } = dto;

    const pageData = await this.privilageService.paginate(searchParams, page);
    const systemIds = pageData.items.map(privilege => privilege.systemId);
    const systemList = await this.systemService.findByIds(systemIds);
    const systemMap = {};
    systemList.forEach(system => systemMap[system.id] = system);
    const newRoles = pageData.items.map(privilege => {
      privilege['systemName'] = systemMap[privilege.systemId].name
      return privilege;
    })
    return { ...pageData, items: newRoles }
  }

  @ApiOperation({
    summary: '获取所有权限',
  })
  @Post('list')
  async list(@Body() dto: ListAllPrivilegeDto) {
    return await this.privilageService.list(dto.systemId);
  }
}
