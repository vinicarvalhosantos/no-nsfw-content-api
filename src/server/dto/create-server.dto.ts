import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString, IsEmail } from 'class-validator';


export class CreateServerDto {

  @ApiProperty({
    description: 'Server id'
  })
  @IsNotEmpty()
  @IsNumber()
  serverId: number;

  @ApiProperty({
    description: 'Server name'
  })
  @IsNotEmpty()
  @IsString()
  serverName: string;

  @ApiProperty({
    description: 'Owner Id'
  })
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

}