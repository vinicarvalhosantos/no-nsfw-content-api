import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsEmail } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'User name'
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User tag'
  })
  @IsNotEmpty()
  @IsString()
  userTag: string;

}