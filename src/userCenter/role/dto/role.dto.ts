import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaginationParams } from "types/type";

export class CreateRoleDto {

  @IsNotEmpty()
  @ApiProperty({ example: '2', description: '系统id' })
  systemId: number;

  @IsNotEmpty()
  @ApiProperty({ example: '普通用户的权限', description: '角色描述' })
  description: string

  @IsNotEmpty()
  @ApiProperty({ example: '普通用户', description: '角色描述' })
  name: string

}

export class UpdateRoleDto extends CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '角色id' })
  id: number;
}



export class DeleteRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '角色id' })
  id: number
}


export class RolePrivilageSetDto {

  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '角色id' })
  roleId: number;

  @IsNotEmpty()
  @ApiProperty({ example: [1, 2], description: 'xxxx' })
  privilegeIds: number[];

  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '系统id' })
  systemId: number;
}


export class RoleListDto {
  @ApiProperty({ example: '2', description: '系统id' })
  systemId: number;
}



export class GetPrivilegeListByIdDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  roleId: number;
}


export class RoleListWithPaginationDto {
  @ApiProperty({ example: '' })
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}