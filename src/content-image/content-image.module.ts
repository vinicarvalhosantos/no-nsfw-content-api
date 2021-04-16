import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../logger/log.module';
import { ContentImageController } from './content-image.controller';
import { ImageContentService } from './content-image.service';

@Module({
    imports: [TypeOrmModule.forFeature(), HttpModule, LogModule],
    providers: [ImageContentService],
    controllers: [ContentImageController]
})
export class ImageContentModule { }