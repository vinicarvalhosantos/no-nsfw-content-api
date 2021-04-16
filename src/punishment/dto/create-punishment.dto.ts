import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class CreatePunishmentDto {

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
  @IsString()
  description: string;

}