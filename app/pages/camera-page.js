import { Camera } from "@ionic-native/core/index"
console.log(Camera)
export const CameraPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".camera", { onclick: (e) => {} }, "camera")
    },
  }
}
