import { IsNotEmpty } from 'class-validator';

export class DeleteSystemDto {
  @IsNotEmpty()
  id: number
}
