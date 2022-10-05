import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, DeleteRoleDto, GetPrivilegeListByIdDto, RoleListDto, RoleListWithPaginationDto, RolePrivilageSetDto } from './dto/role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import { SystemService } from '../system/system.service';
import { PrivilageService } from '../privilege/privilege.service';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly rolePrivilegeService: RolePrivilegeService,
    private readonly privilegeService: PrivilageService,
    private readonly systemService: SystemService,

  ) { }

  @ApiOperation({
    summary: '创建新角色',
  })
  @Post('/create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '删除角色',
    description: '如果发现角色有绑定权限，权限将同步删除 Role - privilege 关系表',
  })
  @Post('/delete')
  remove(@Body() dto: DeleteRoleDto) {
    return this.roleService.remove(dto.id);
  }

  @ApiOperation({
    summary: '角色列表',
    description: '根据系统返回对应系统的角色列表',
  })
  @Post('/list')
  list(@Body() dto: RoleListDto) {
    return this.roleService.list(dto.systemId)
  }

  @ApiOperation({
    summary: '角色ID查询权限',
    description: '根据角色id查权限',
  })
  @Post('/getPrivilegeListById')
  async getPrivilegeListById(
    @Body() dto: GetPrivilegeListByIdDto
  ) {
    const rolePrivilegeList = await this.rolePrivilegeService.listByRoleIds([dto.roleId]);

    const privilegeList = await this.privilegeService.findByIds(rolePrivilegeList.map(({ privilegeId }) => privilegeId));

    return privilegeList;
  }

  @ApiOperation({
    summary: '角色列表(分页)',
    description: '根据角色名称查询',
  })
  @Post('/list/pagination')
  async listWithPagination(@Body() dto: RoleListWithPaginationDto) {
    const { page, ...serchParams } = dto;
    const pageData = await this.roleService.paginate(serchParams, page);
    const systemIds = pageData.items.map(role => role.systemId);
    const systemList = await this.systemService.findByIds(systemIds);
    const systemMap = {};
    systemList.forEach(system => systemMap[system.id] = system);
    const newRoles = pageData.items.map(role => {
      role['systemName'] = systemMap[role.systemId].name
      return role;
    })

    return { ...pageData, items: newRoles }
  }

  @ApiOperation({
    summary: '角色分配权限',
    description: '',
  })
  @Post('set')
  async set(@Body() dto: RolePrivilageSetDto) {
    await this.rolePrivilegeService.remove(dto.roleId)
    return await this.rolePrivilegeService.set(dto.roleId, dto.privilegeIds, dto.systemId)
  }
}


