import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { LogModule } from './logger/log.module';
import { ConfigurationService } from './config/configuration.service';
import { ConfigurationModule } from './config/configuration.module';
import { TerminusOptionsService } from './health/terminus-options.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { ImageContentModule } from './content-image/content-image.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ConfigurationModule,
    LogModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'mysql' as 'mysql',
        host: configurationService.databaseHost,
        port: configurationService.databasePort,
        username: configurationService.databaseUsername,
        password: configurationService.databasePassword,
        database: configurationService.databaseName,
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: configurationService.databaseSynchronize,
        logging: configurationService.databaseLogging,
      }),
      inject: [ConfigurationService],
    }),
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useClass: TerminusOptionsService,
    }),
    ImageContentModule,
    UserModule
  ]
})
export class AppModule { }
