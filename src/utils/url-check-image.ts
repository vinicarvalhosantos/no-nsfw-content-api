const urlIsJpgOrPng = (urlImage: string) => {
  const urlSplitted = urlImage.split('/');
  const imageName = urlSplitted[urlSplitted.length - 1];
  const imageNameSplitted = imageName.split('.');
  const imageExtension = imageNameSplitted[imageNameSplitted.length - 1];
  if (imageExtension === 'png' || imageExtension === 'jpeg' || imageExtension === 'jpg') {
    return true;
  }
  return false;
}
const urlIsGif = (urlImage: string) => {
  const urlSplitted = urlImage.split('/');
  const imageName = urlSplitted[urlSplitted.length - 1];
  const imageNameSplitted = imageName.split('.');
  const imageExtension = imageNameSplitted[imageNameSplitted.length - 1];
  if (imageExtension === 'gif') return true;
  return false;
}

export const UrlCheckImageUtils = {
  urlIsJpgOrPng,
  urlIsGif
}