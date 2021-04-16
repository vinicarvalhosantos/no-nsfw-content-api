const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const utils = require('../../utils/index');

async function checkImageContent(urlImage) {
  const isJpgOrPng = utils.urlCheckImageUtils.urlIsJpgOrPng(urlImage);
  const isGif = utils.urlCheckImageUtils.urlIsGif(urlImage);
  const resultObject = { urlImage: urlImage, predictions: [] };
  console.log(urlImage);
  if (isJpgOrPng || isGif) {
    const picture = await getPicture(urlImage);
    const model = await nsfw.load();
    const image = tf.node.decodeImage(picture.data);
    if (Buffer.isBuffer(image) || Buffer.isBuffer(picture.data)) {
      const imagePredictions = isJpgOrPng ? await model.classify(image) : await model.classifyGif(picture.data);
      resultObject.predictions = imagePredictions
      return resultObject;
    }
    await image.dispose();

  }
  return [];
}

const getPicture = async (urlImage) => {
  const picture = await axios.get(`${urlImage}`, {
    responseType: 'arraybuffer',
  });

  return picture;
}

export const imageContentService = {
  checkImageContent
};
