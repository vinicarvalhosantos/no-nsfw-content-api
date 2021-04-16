import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';
import { LogService } from 'src/logger/log.service';
import { CheckImageContentDto } from './dto/check-image-content.dto';
import { UrlCheckImageUtils } from '../utils/url-check-image';
import { ReadImageContentDto } from './dto/read-image-content.dto';
import * as tf from '@tensorflow/tfjs-node';
import * as nsfw from 'nsfwjs';
import axios from 'axios';

@Injectable()
export class ImageContentService {
  constructor(
    private readonly logger: LogService,
    private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(undefined, (err: AxiosError) => {
      throw new HttpException(err.response, err.response.status)
    });
  }

  async checkImageContent(dtoImage: CheckImageContentDto) {
    try {
      const isJpgOrPng = UrlCheckImageUtils.urlIsJpgOrPng(dtoImage.urlImage);
      const isGif = UrlCheckImageUtils.urlIsGif(dtoImage.urlImage);
      const resultObject = new ReadImageContentDto;
      if (isJpgOrPng || isGif) {
        const picture = await this.getPicture(dtoImage.urlImage);
        const model = await nsfw.load();
        const image = await tf.node.decodeImage(picture.data);
        if (Buffer.isBuffer(image) || Buffer.isBuffer(picture.data)) {
          // @ts-ignore
          const imagePredictions = isJpgOrPng ? await model.classify(image) : await model.classifyGif(picture.data);
          resultObject.urlImage = dtoImage.urlImage;
          resultObject.predictions = imagePredictions;
          return resultObject;
        }

        await image.dispose();
      }
      throw new HttpException(`Do not found any image on url`, 404)
    } catch (error) {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`It was not possible to check the url image \n${error}`)
      throw new HttpException(`It was not possible to check the url image \n${error}`, errorDetails.status);
    }
  }

  async getPicture(urlImage: string) {
    const picture = await axios.get(`${urlImage}`, {
      responseType: 'arraybuffer',
    });

    return picture;
  }

}
