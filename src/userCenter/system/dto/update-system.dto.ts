import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateSystemDto } from './create-system.dto';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
  @IsNotEmpty()
  id: number
}
