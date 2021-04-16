import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class CheckImageContentDto {

  @ApiProperty({
    description: 'Image url'
  })
  @IsNotEmpty()
  @IsString()
  urlImage: string;

}