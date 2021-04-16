import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdatePunishmentDto {

  @ApiProperty({
    description: 'Punishment name'
  })
  @IsNotEmpty()
  @IsString()
  punishmentName: string;

  @ApiProperty({
    description: 'Punishment description'
  })
  @IsNotEmpty()
  @IsNumber()
  description: string;

}