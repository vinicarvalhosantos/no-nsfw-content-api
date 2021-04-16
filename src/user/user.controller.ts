import { Controller, Get, Body, Post, Param, Query, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto, ReadUserDto, FindOneParams, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { ResponseMapper } from '../decorator/response-mapper.decorator';
import { ResponseReadUserDto } from './dto/read-user.dto';

@Controller('api/v1/user')
@ApiTags('user')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Access denied' })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  @ResponseMapper(ReadUserDto)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put('update/:userId')
  @ApiOperation({ summary: 'Alterar informações de usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Registro alterado com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de alterar o registro' })
  @ApiParam({ name: "userId" })
  @ResponseMapper(ReadUserDto)
  async update(@Param() params: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(params.userId, updateUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Listagem dos usuários realizadado com sucesso.', type: ResponseReadUserDto })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ResponseMapper(ResponseReadUserDto)
  async findAll(@Query('limit') limit: number = 100, @Query('offset') page: number = 1) {
    return await this.userService.paginate({ page, limit });
  }

}
