import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from '../../base/dto/defaultResponse.dto';


export class ReadUserDto {
  @ApiProperty({
    description: 'Registry Number'
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'User id'
  })
  @Expose()
  userId: number

  @ApiProperty({
    description: "User name"
  })
  @Expose()
  username: string;

  @ApiProperty({
    description: 'User tag'
  })
  @Expose()
  userTag: string;

  @ApiProperty({
    description: 'Created when'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated when'
  })
  @Expose()
  updatedAt: Date;
}

export class ResponseReadUserDto extends PaginateResponseDto<ReadUserDto[]> {
  @ApiProperty({ type: ReadUserDto, isArray: true })
  @Expose()
  @Type(() => ReadUserDto)
  items: ReadUserDto[];
}
