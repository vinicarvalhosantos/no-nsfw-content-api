import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, Exclude } from 'class-transformer';
import { PaginateResponseDto } from '../../base/dto/defaultResponse.dto';
import { predictionType } from 'nsfwjs';


export class ReadImageContentDto {

  @ApiProperty({
    description: 'Checked image url'
  })
  @Expose()
  urlImage: string

  @ApiProperty({
    description: "Predictions"
  })
  @Expose()
  predictions: predictionType[] | predictionType[][];

}

export class PredictionsDto {

  @ApiProperty({
    description: 'predict class name'
  })
  @Expose()
  className: string

  @ApiProperty({
    description: "predict probability"
  })
  @Exclude()
  probability: number;

}

export class ResponseReadImageContentDto extends PaginateResponseDto<ReadImageContentDto[]> {
  @ApiProperty({ type: ReadImageContentDto, isArray: true })
  @Expose()
  @Type(() => ReadImageContentDto)
  items: ReadImageContentDto[];
}
