const initCam = (v) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      //video.src = window.URL.createObjectURL(stream);
      v.srcObject = stream
      v.play()
    })
  }
}

const draw = (mdl, side) => {
  let video = document.getElementById("video")
  let image = new Image()
  document
    .getElementById("canvas")
    .getContext("2d")
    .drawImage(video, 0, 0, 640, 480)
  image.src = document.getElementById("canvas").toDataURL("image/png")
  mdl[mdl.side] = image
  m.route.set("/addcard")
}

const Picture = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".container", [
        m("video", {
          id: "video",
          oncreate: ({ dom }) => initCam(dom),
          width: 640,
          height: 480
        }),
        m("canvas", { id: "canvas", width: 640, height: 480 }),
        m("button", { onclick: () => draw(mdl) }, "Save")
      ])
  }
}

export default Picture
