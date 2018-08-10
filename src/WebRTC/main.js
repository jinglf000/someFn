/* only video */
const mediaStreamConstraints = {
  video: true
}

const localVideo = document.querySelector('video');

let localStream;

/* success */
function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

/* error */
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error:', error);
}

navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
.then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
