function urlIsJpgOrPng(urlImage) {
  const urlSplitted = urlImage.split('/');
  const imageName = urlSplitted[urlSplitted.length - 1];
  const imageNameSplitted = imageName.split('.');
  const imageExtension = imageNameSplitted[imageNameSplitted.length - 1];
  if (imageExtension === 'png' || imageExtension === 'jpeg' || imageExtension === 'jpg') {
    return true;
  }
  return false;
}

function urlIsGif(urlImage) {
  const urlSplitted = urlImage.split('/');
  const imageName = urlSplitted[urlSplitted.length - 1];
  const imageNameSplitted = imageName.split('.');
  const imageExtension = imageNameSplitted[imageNameSplitted.length - 1];
  if (imageExtension === 'gif') return true;
  return false;
}

export const urlCheckImageUtils = {
  urlIsJpgOrPng,
  urlIsGif
};