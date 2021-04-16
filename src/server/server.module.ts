import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './server.entity';
import { ServerCrudService } from './server-crud.service';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { LogModule } from '../logger/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([Server]), HttpModule, LogModule],
  providers: [ServerCrudService, ServerService],
  controllers: [ServerController]
})
export class ServerModule { }