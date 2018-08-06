/**
 * chrome camera
 * camera demo https://webrtc.github.io/samples/src/content/getusermedia/gum/
 */
const device = navigator.mediaDevices;

device.enumerateDevices().then((res) => {
  console.log(res);
}).catch(e => {
  console.error(e);
});
