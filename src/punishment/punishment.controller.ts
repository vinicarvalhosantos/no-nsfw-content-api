import { Controller, Get, Body, Post, Param, Query, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PunishmentService } from './punishment.service';
import { ResponseMapper } from '../decorator/response-mapper.decorator';
import { ReadPunishmentDto, ResponseReadPunishmentDto } from './dto/read-punishment.dto';
import { CreatePunishmentDto } from './dto/create-punishment.dto';
import { FindOneParams } from './dto';
import { UpdatePunishmentDto } from './dto/update-punishment.dto';

@Controller('api/v1/punishment')
@ApiTags('punishment')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Access denied' })
export class PunishmentController {
  constructor(private readonly punishmentService: PunishmentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new Punishment' })
  @ApiBody({ type: CreatePunishmentDto })
  @ApiResponse({ status: 201, description: 'Punishment created successfully.', type: ReadPunishmentDto })
  @ApiResponse({ status: 404, description: 'Punishment not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ResponseMapper(ReadPunishmentDto)
  async create(@Body() createPunishmentDto: CreatePunishmentDto) {
    return await this.punishmentService.create(createPunishmentDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update Punishment info' })
  @ApiBody({ type: UpdatePunishmentDto })
  @ApiResponse({ status: 200, description: 'Punishment created successfully.', type: ReadPunishmentDto })
  @ApiResponse({ status: 404, description: 'Punishment not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ApiParam({ name: "id" })
  @ResponseMapper(ReadPunishmentDto)
  async update(@Param() params: FindOneParams, @Body() updatePunishmentDto: UpdatePunishmentDto) {
    return await this.punishmentService.updatePunishment(params.id, updatePunishmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Punishment' })
  @ApiResponse({ status: 200, description: 'Punishment created successfully.', type: ReadPunishmentDto })
  @ApiResponse({ status: 404, description: 'Punishment not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ResponseMapper(ResponseReadPunishmentDto)
  async findAll(@Query('limit') limit: number = 100, @Query('offset') page: number = 1) {
    return await this.punishmentService.paginate({ page, limit });
  }

}
