import { Camera } from "@ionic/core"
console.log(Camera)
export const CameraPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".camera", { onclick: (e) => {} }, "camera")
    },
  }
}
