import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../base/base-crud.service';
import { Punishment } from './punishment.entity';

@Injectable()
export class PunishmentCrudService extends BaseCrudService<Punishment> {
  constructor(@InjectRepository(Punishment) readonly repository: Repository<Punishment>
  ) {
    super(repository);
  }


  updatePunishment(id: number, model: Punishment): Promise<Punishment> {
    return this.repository
      .findOne({ where: { id: id } })
      .then(entity => {
        if (!entity) throw new NotFoundException();
        return this.repository.update(id, model);
      })
      .then(() => this.repository.findOne({ where: { id: id } }));
  }

}
