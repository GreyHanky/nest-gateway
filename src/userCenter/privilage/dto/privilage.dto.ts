import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Action } from "../entities/privilage.mysql.entity";
import { PartialType } from '@nestjs/mapped-types';

export class CreatePrivilageDto {

  @ApiProperty({ example: '2', description: '系统一' })
  @IsNotEmpty()
  systemId: number;

  @ApiProperty({ example: '查看', description: '权限名称' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'page', description: '类型' })
  @IsNotEmpty()
  resourceKey: string;

  @ApiProperty({ example: '查看权限', description: '描述' })
  description: string;

  @ApiProperty({ example: 'read', enum: Action })
  @IsNotEmpty()
  action: string;

}


export class DeletePrivilageDto {
  @ApiProperty({ example: '1', description: '权限id' })
  @IsNotEmpty()
  privilageId: number
}

export class UpdatePrivilageDto extends PartialType(CreatePrivilageDto) {
  @ApiProperty({ example: '1', description: '权限ID' })
  @IsNotEmpty()
  id:number
}

