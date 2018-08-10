/**
 * chrome camera
 * camera demo https://webrtc.github.io/samples/src/content/getusermedia/gum/
 */
const device = navigator.mediaDevices;

// device.enumerateDevices().then((res) => {
//   console.log(res);
// }).catch(e => {
//   console.error(e);
// });

/**
 * 错误处理
 * @param {Object} e error
 */
function handleError(e) {
  console.log(e);
}

/**
 * 成功处理
 * @param {Object} stream vedio返回的流
 */
function handleSuccess(stream) {
  const video = document.querySelector('#video');
  const videoTracks = stream.getVideoTracks();

  stream.onended = function () {
    console.log('Stream ended');
  }
  console.log('Using video device: ' + videoTracks[0].label)
  window.stream = stream;

  video.srcObject = stream;

}

/* media */
device.getUserMedia({
  audio: false,
  video: true
}).then(handleSuccess).catch(handleError);
