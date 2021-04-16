import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../base/base-crud.service';
import { Server } from './server.entity';

@Injectable()
export class ServerCrudService extends BaseCrudService<Server> {
  constructor(@InjectRepository(Server) readonly repository: Repository<Server>
  ) {
    super(repository);
  }


  updateServer(serverId: number, model: Server): Promise<Server> {
    return this.repository
      .findOne({ where: { serverId: serverId } })
      .then(entity => {
        if (!entity) throw new NotFoundException();
        return this.repository.update(serverId, model);
      })
      .then(() => this.repository.findOne({ where: { serverId: serverId } }));
  }

}
