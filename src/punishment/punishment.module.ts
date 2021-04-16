import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Punishment } from './punishment.entity';
import { PunishmentCrudService } from './punishment-crud.service';
import { PunishmentController } from './punishment.controller';
import { PunishmentService } from './punishment.service';
import { LogModule } from '../logger/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Punishment]), HttpModule, LogModule],
  providers: [PunishmentCrudService, PunishmentService],
  controllers: [PunishmentController]
})
export class PunishmentModule { }