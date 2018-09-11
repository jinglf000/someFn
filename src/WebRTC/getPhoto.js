/**
 * get Photos from vedio
 */
const video = document.querySelector('video');
const btnSnap = document.querySelector('#btn_snap');
const btnTrack = document.querySelector('#btn_track');
const btnStop = document.querySelector('#btn_stop');

const canvasPhoto = document.querySelector('#canvas_photo');
const photoCtx = canvasPhoto.getContext('2d');
const canvasDraw = document.querySelector('#canvas_draw');
const drawCtx = canvasDraw.getContext('2d');



let canTrack = true;
let trackDuration = 33;

grabWebCamVideo();


// 人脸捕获
var tracker = new tracking.ObjectTracker(['face']);
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);
// 捕获后内容绘制
tracker.on('track', function (event) {
  console.log(event.data);
  event.data.forEach(function (item) {
    drawCtx.clearRect(0, 0, canvasDraw.width, canvasDraw.height);
    drawCtx.strokeStyle = '#ff0000';
    drawCtx.strokeRect(item.x, item.y, item.width, item.height);
  });
});

// 点击定时捕获
btnTrack.addEventListener('click', function () {
  snapPhotoAlways(function () {
    tracking.track(canvasPhoto, tracker);
  });
});

/**
 * 点击捕获照片
 */
btnSnap.addEventListener('click', function (event) {
  snapPhoto();
});

/**
 * 点击停止捕获
 */
btnStop.addEventListener('click', function () {
  canTrack = false;
})

/**
 * snapPhoto 视频截图
 * @return {canvasElement}
 */
function snapPhoto() {
  photoCtx.drawImage(video, 0, 0, canvasPhoto.width, canvasPhoto.height);
  return canvasPhoto;
}

/**
 * 显示视频流
 */
function grabWebCamVideo() {
  navigator.mediaDevices.getUserMedia({ video: true})
  .then(stream => {
    video.srcObject = stream;
  })
  .catch((e) => {
    console.error(e);
  });
}





/**
 * 持续捕获
 * @param {number} time 捕获事件间隔
 * @param {function}  fn 捕获成功回调函数
 */
function snapPhotoAlways(time, fn) {
  fn = typeof time === 'function' ? time : fn;
  time = typeof time === 'number' ? time: trackDuration;

  setTimeout(() => {
    var res = snapPhoto();
    (typeof fn === 'function') && (fn.call(res));
    if (canTrack) {
      snapPhotoAlways(time, fn);
    }
  }, time);
}
