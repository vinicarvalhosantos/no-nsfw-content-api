import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginateResponseDto } from '../../base/dto/defaultResponse.dto';


export class ReadPunishmentDto {
  @ApiProperty({
    description: 'Registry Number'
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Punishment name'
  })
  @Expose()
  punishmentName: string

  @ApiProperty({
    description: "Punishment description"
  })
  @Expose()
  description: string;

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

export class ResponseReadPunishmentDto extends PaginateResponseDto<ReadPunishmentDto[]> {
  @ApiProperty({ type: ReadPunishmentDto, isArray: true })
  @Expose()
  @Type(() => ReadPunishmentDto)
  items: ReadPunishmentDto[];
}
