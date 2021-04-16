import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserCrudService } from './user-crud.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LogModule } from '../logger/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule, LogModule],
  providers: [UserCrudService, UserService],
  controllers: [UserController]
})
export class UserModule { }