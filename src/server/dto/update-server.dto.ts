import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsEmail } from 'class-validator';

export class UpdateServerDto {

  @ApiProperty({
    description: 'Server name'
  })
  @IsNotEmpty()
  @IsString()
  serverName: string;

  @ApiProperty({
    description: 'Owner id'
  })
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

}