import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSystemDto {

  @IsNotEmpty()
  @ApiProperty({ default: 'materials', description: '系统名称' })
  name: string

  @IsNotEmpty()
  @ApiProperty({ default: '物料系统', description: '系统描述' })
  description: string;
}