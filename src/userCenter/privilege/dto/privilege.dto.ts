import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Action, PrivilegeStatus } from "../entities/privilege.mysql.entity";
import { PartialType } from '@nestjs/mapped-types';
import { PaginationParams } from "types/type";

export class CreatePrivilegeDto {

  @ApiProperty({ example: '1', description: '系统一' })
  @IsNotEmpty()
  systemId: number;

  @ApiProperty({ example: '查看', description: '权限名称' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'system1-abc', description: '类型' })
  @IsNotEmpty()
  resourceKey: string;

  @ApiProperty({ example: '查看权限', description: '描述' })
  description: string;

  @ApiProperty({ example: 'read', enum: Action })
  @IsNotEmpty()
  action: string;

}

export class DisablePrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '权限ID' })
  privilegeId: number;

  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '权限状态', enum: PrivilegeStatus })
  status: number;
}


export class DeletePrivilegeDto {
  @ApiProperty({ example: '1', description: '权限id' })
  @IsNotEmpty()
  privilageId: number
}

export class UpdatePrivilegeDto extends PartialType(CreatePrivilegeDto) {
  @ApiProperty({ example: '1', description: '权限ID' })
  @IsNotEmpty()
  id: number
}



export class PrivilegeListWithPaginationDto {
  @ApiProperty({ example: '', description: '查询关键词' })
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}

export class ListAllPrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ example: '2', description: '系统ID' })
  systemId: number;
}
