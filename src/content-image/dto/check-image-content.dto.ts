import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString, IsEmail } from 'class-validator';


export class CheckImageContentDto {

  @ApiProperty({
    description: 'Image url'
  })
  @IsNotEmpty()
  @IsString()
  urlImage: string;

}