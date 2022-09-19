import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddUserDto } from './user.dto';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }

  @Post('/found-error')
  foundError() {
    throw new BusinessException('自定义错误')
  }
}
