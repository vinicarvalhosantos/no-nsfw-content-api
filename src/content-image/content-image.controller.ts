import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CheckImageContentDto } from './dto/check-image-content.dto';
import { ReadImageContentDto } from './dto/read-image-content.dto';
import { ResponseMapper } from '../decorator/response-mapper.decorator';
import { ImageContentService } from './content-image.service';

@Controller('api/v1/image-content')
@ApiTags('image-content')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Access denied' })
export class ContentImageController {
  constructor(private readonly imageContentService: ImageContentService) { }

  @Post('check')
  @ApiOperation({ summary: 'Check image nsfw content' })
  @ApiBody({ type: CheckImageContentDto })
  @ApiResponse({ status: 201, description: 'Image checked with success', type: ReadImageContentDto })
  @ApiResponse({ status: 404, description: 'Image not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ResponseMapper(ReadImageContentDto)
  async create(@Body() checkImageContentDto: CheckImageContentDto) {
    return await this.imageContentService.checkImageContent(checkImageContentDto);
  }


}
