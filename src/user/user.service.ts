import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';
import { User as User } from './user.entity';
import { UserCrudService } from './user-crud.service';
import { CreateUserDto, ReadUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LogService } from 'src/logger/log.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly userCrudService: UserCrudService,
    private readonly logger: LogService,
    @InjectRepository(User) private readonly repository: Repository<ReadUserDto>,
    private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(undefined, (err: AxiosError) => {
      throw new HttpException(err.response, err.response.status)
    });
  }
  async create(dtoUser: CreateUserDto) {
    let user = new User();
    user.userId = dtoUser.userId;
    user.username = dtoUser.username;
    user.userTag = dtoUser.userTag;
    return await this.userCrudService.create(user).then(async response => {
      return response;
    }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to create an user\n${error}`);
      throw new HttpException(`It was not possible to create an user`, errorDetails.status);
    })
  }

  async paginate(options: IPaginationOptions) {
    return await paginate<ReadUserDto>(this.repository, options);;
  }

  async findOne(userId: number) {
    return await this.userCrudService.findOne({ where: { userId: userId } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to find an user\n${error}`);
      throw new HttpException(`It was not possible to find an user`, errorDetails.status);
    });
  }

  async updateUser(userId: number, dtoUpdate: UpdateUserDto) {
    let user = new User();
    const responseUser = await this.userCrudService.findOne({ where: { userId: userId } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to update an user\n${error}`);
      throw new HttpException(`It was not possible to update an user`, errorDetails.status);
    });
    if (responseUser) {
      user.userTag = dtoUpdate.userTag;
      user.username = dtoUpdate.username;

      return await this.userCrudService.updateUser(userId, user).catch(error => {
        const errorDetails = JSON.parse(JSON.stringify(error));
        this.logger.error(`It was not possible to update an user\n${error}`);
      throw new HttpException(`It was not possible to update an user`, errorDetails.status);
      });
    }
  }
}
