import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Server as Server } from './server.entity';
import { ServerCrudService } from './server-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LogService } from 'src/logger/log.service';
import { UpdateServerDto } from './dto/update-server.dto';
import { ReadServerDto } from './dto/read-server.dto';
import { CreateServerDto } from './dto/create-server.dto';
@Injectable()
export class ServerService {
  constructor(
    private readonly serverCrudService: ServerCrudService,
    private readonly logger: LogService,
    @InjectRepository(Server) private readonly repository: Repository<ReadServerDto>,
    private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(undefined, (err: AxiosError) => {
      throw new HttpException(err.response, err.response.status)
    });
  }
  async create(dtoServer: CreateServerDto) {
    let server = new Server();
    server.serverId = dtoServer.serverId;
    server.serverName = dtoServer.serverName;
    server.ownerId = dtoServer.ownerId;
    return await this.serverCrudService.create(server).then(async response => {
      return response;
    }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to create an server\n${error}`);
      throw new HttpException(`It was not possible to create a server`, errorDetails.status);
    })
  }

  async paginate(options: IPaginationOptions) {
    return await paginate<ReadServerDto>(this.repository, options);;
  }

  async findOne(serverId: number) {
    return await this.serverCrudService.findOne({ where: { serverId: serverId } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to find a server\n${error}`);
      throw new HttpException(`It was not possible to find a server`, errorDetails.status);
    });
  }

  async updateServer(serverId: number, dtoUpdate: UpdateServerDto) {
    let server = new Server();
    const responseServer = await this.serverCrudService.findOne({ where: { serverId: serverId } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to update a server\n${error}`);
      throw new HttpException(`It was not possible to update a server`, errorDetails.status);
    });
    if (responseServer) {
      server.serverName = dtoUpdate.serverName;
      server.ownerId = dtoUpdate.ownerId;

      return await this.serverCrudService.updateServer(serverId, server).catch(error => {
        const errorDetails = JSON.parse(JSON.stringify(error));
        this.logger.error(`It was not possible to update a server\n${error}`);
        throw new HttpException(`It was not possible to update a server`, errorDetails.status);
      });
    }
  }
}
