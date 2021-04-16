import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Punishment as Punishment } from './punishment.entity';
import { PunishmentCrudService } from './punishment-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LogService } from 'src/logger/log.service';
import { UpdatePunishmentDto } from './dto/update-punishment.dto';
import { ReadPunishmentDto } from './dto/read-punishment.dto';
import { CreatePunishmentDto } from './dto/create-punishment.dto';
@Injectable()
export class PunishmentService {
  constructor(
    private readonly punishmentCrudService: PunishmentCrudService,
    private readonly logger: LogService,
    @InjectRepository(Punishment) private readonly repository: Repository<ReadPunishmentDto>,
    private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(undefined, (err: AxiosError) => {
      throw new HttpException(err.response, err.response.status)
    });
  }
  async create(dtoPunishment: CreatePunishmentDto) {
    let punishment = new Punishment();
    punishment.punishmentName = dtoPunishment.punishmentName;
    punishment.description = dtoPunishment.description;
    return await this.punishmentCrudService.create(punishment).then(async response => {
      return response;
    }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to create a punishment\n${error}`);
      throw new HttpException(`It was not possible to create a punishment`, errorDetails.status);
    })
  }

  async paginate(options: IPaginationOptions) {
    return await paginate<ReadPunishmentDto>(this.repository, options);;
  }

  async findOne(id: number) {
    return await this.punishmentCrudService.findOne({ where: { id: id } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to find a punishment\n${error}`);
      throw new HttpException(`It was not possible to find a punishment`, errorDetails.status);
    });
  }

  async updatePunishment(id: number, dtoUpdate: UpdatePunishmentDto) {
    let punishment = new Punishment();
    const responsePunishment = await this.punishmentCrudService.findOne({ where: { id: id } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to update a punishment\n${error}`);
      throw new HttpException(`It was not possible to update a punishment`, errorDetails.status);
    });
    if (responsePunishment) {
      punishment.punishmentName = dtoUpdate.punishmentName;
      punishment.description = dtoUpdate.description;

      return await this.punishmentCrudService.updatePunishment(id, punishment).catch(error => {
        const errorDetails = JSON.parse(JSON.stringify(error));
        this.logger.error(`It was not possible to update a punishment\n${error}`);
        throw new HttpException(`It was not possible to update a punishment`, errorDetails.status);
      });
    }
  }
}
