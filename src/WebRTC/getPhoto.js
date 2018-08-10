/**
 * get Photos from vedio
 */
const video = document.querySelector('video');
const btn = document.querySelector('#btn');
const photo = document.querySelector('#photo');
const photoContext = photo.getContext('2d');

/**
 * snapPhoto 视频截图
 */
function snapPhoto() {
  photoContext.drawImage(video, 0, 0, photo.width, photo.height);
}

/**
 * 显示视频流
 */
function grabWebCamVideo() {
  console.log('GETTING user media');
  navigator.mediaDevices.getUserMedia({ video: true})
  .then(stream => {
    video.srcObject = stream;
  })
  .catch((e) => {
    console.error(e);
  });
}

/**
 * btn click handle
 */
btn.addEventListener('click', function (event) {
  snapPhoto();
});

grabWebCamVideo();
