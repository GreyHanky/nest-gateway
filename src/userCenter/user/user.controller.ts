import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddUserDto } from './user.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { PayloadUser } from '@/helper';
import { Payload } from 'types/type';
import { DisableUserDto, SetRolesDto, GetRolesByIdDto, UserListWithPaginationDto } from './dto/user.dto';
import { UserRoleService } from '../user-role/user-role.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
  ) { }

  @ApiOperation({
    summary: '用户信息',
  })
  @Post('/profile')
  profile(@PayloadUser() user: Payload) {
    return this.userService.profile(user.userId);
  }

  @ApiOperation({
    summary: '用户激活状态切换',
  })
  @Post('/changeState')
  async changeState(@Body() dto: DisableUserDto) {
    const found = await this.userService.getUserById(dto.userId);
    if (!found) {
      throw new BusinessException(`为找到id为${dto.userId}的用户`)
    }

    return this.userService.createOrSave({ ...found, status: dto.status })
  }

  @ApiOperation({
    summary: '设置用户角色',
  })
  @Post('/setRoles')
  async setRoles(
    @Body() dto: SetRolesDto
  ) {
    return this.userRoleService.setUserRoles(dto.userId, dto.systemId, dto.roleIds)
  }

  @ApiOperation({
    summary: '获取用户的角色',
  })
  @Post('/getRolesById')
  async getRolesById(
    @Body() dto: GetRolesByIdDto
  ) {
    const found = await this.userService.getUserById(dto.userId);
    if (!found) {
      throw new BusinessException(`为找到id为${dto.userId}的用户`)
    }

    return this.userService.getRolesById(dto.userId, dto.systemId)
  }




  @ApiOperation({
    summary: '用户列表（分页）',
  })
  @Post('/list/pagination')
  async listWithPagination(@Body() dto: UserListWithPaginationDto) {
    const { page, ...searchParams } = dto;
    return this.userService.paginate(searchParams, page);
  }


  @Post('/found-error')
  foundError() {
    throw new BusinessException('自定义错误')
  }
}
