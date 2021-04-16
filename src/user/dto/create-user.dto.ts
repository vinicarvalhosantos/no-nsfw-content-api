import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class CreateUserDto {

  @ApiProperty({
    description: 'User id'
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

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