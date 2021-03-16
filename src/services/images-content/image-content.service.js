const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const utils = require('../../utils/index');

async function checkImageContent(urlImage) {
  const isJpgOrPng = utils.urlCheckImageUtils.urlIsJpgOrPng(urlImage);
  const isGif = utils.urlCheckImageUtils.urlIsGif(urlImage);
  if (isJpgOrPng || isGif) {
    const picture = await axios.get(`${urlImage}`, {
      responseType: 'arraybuffer',
    });
    
    const model = await nsfw.load();
    const image = tf.node.decodeImage(picture.data);
    const predictions = isJpgOrPng ? await model.classify(image) : await model.classifyGif(picture.data);
    await image.dispose();
    return predictions;
  }
  return [];
}

export const imageContentService = {
  checkImageContent
};
