import { Controller, Get, Body, Post, Param, Query, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ServerService } from './server.service';
import { ResponseMapper } from '../decorator/response-mapper.decorator';
import { ReadServerDto, ResponseReadServerDto } from './dto/read-server.dto';
import { CreateServerDto } from './dto/create-server.dto';
import { FindOneParams } from './dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Controller('api/v1/server')
@ApiTags('server')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Access denied' })
export class ServerController {
  constructor(private readonly serverService: ServerService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new server' })
  @ApiBody({ type: CreateServerDto })
  @ApiResponse({ status: 201, description: 'Server created successfully.', type: ReadServerDto })
  @ApiResponse({ status: 404, description: 'Server not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ResponseMapper(ReadServerDto)
  async create(@Body() createServerDto: CreateServerDto) {
    return await this.serverService.create(createServerDto);
  }

  @Put('update/:serverId')
  @ApiOperation({ summary: 'Update server info' })
  @ApiBody({ type: UpdateServerDto })
  @ApiResponse({ status: 200, description: 'Server created successfully.', type: ReadServerDto })
  @ApiResponse({ status: 404, description: 'Server not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ApiParam({ name: "serverId" })
  @ResponseMapper(ReadServerDto)
  async update(@Param() params: FindOneParams, @Body() updateServerDto: UpdateServerDto) {
    return await this.serverService.updateServer(params.serverId, updateServerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all server' })
  @ApiResponse({ status: 200, description: 'Server created successfully.', type: ReadServerDto })
  @ApiResponse({ status: 404, description: 'Server not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ResponseMapper(ResponseReadServerDto)
  async findAll(@Query('limit') limit: number = 100, @Query('offset') page: number = 1) {
    return await this.serverService.paginate({ page, limit });
  }

}
