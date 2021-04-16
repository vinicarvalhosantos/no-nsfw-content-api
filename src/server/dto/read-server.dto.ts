import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from '../../base/dto/defaultResponse.dto';


export class ReadServerDto {
  @ApiProperty({
    description: 'Registry Number'
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Server id'
  })
  @Expose()
  serverId: number

  @ApiProperty({
    description: "Server name"
  })
  @Expose()
  serverName: string;

  @ApiProperty({
    description: 'Owner id'
  })
  @Expose()
  ownerId: number;

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

export class ResponseReadServerDto extends PaginateResponseDto<ReadServerDto[]> {
  @ApiProperty({ type: ReadServerDto, isArray: true })
  @Expose()
  @Type(() => ReadServerDto)
  items: ReadServerDto[];
}
