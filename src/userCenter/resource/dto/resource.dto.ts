import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { PaginationParams } from "types/type"

export class CreateResourceDto {
  @ApiProperty({ example: '权限', description: '资源信息' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'abc', description: '资源标识' })
  @IsNotEmpty()
  key: string

  @ApiProperty({ example: 'ab', description: '父级资源标识' })
  @IsNotEmpty()
  parentId: number

  @ApiProperty({ example: '2', description: '系统标识' })
  @IsNotEmpty()
  systemId: number
}


export class UpdateResourceDto {
  @ApiProperty({ example: '权限', description: '资源信息' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: '2', description: '资源ID' })
  @IsNotEmpty()
  id: number
}

export class DeleteResourceDto {
  @ApiProperty({ example: '2', description: '资源ID' })
  @IsNotEmpty()
  id: number
}

export class ListBySystemIdDto {
  @ApiProperty({ example: '2', description: '系统标识' })
  @IsNotEmpty()
  systemId: number
}


export class ResourceListWithPaginationDto {
  @ApiProperty({ example: '', description: '查询关键词' })
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}



