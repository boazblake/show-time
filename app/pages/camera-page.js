import { Plugins , CameraResultType} from '@capacitor/core'


const initCamera = () => {
  const state = {data:null, error:null}

  const onSuccess = image => {
    console.log('image', image)
    state.data = image
  }
  const onError = e => {
    state.error = e
  }

  Plugins.Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  }).then(
    onSuccess, onError
  )
}

export const CameraPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".camera",
      m('ion-button',  { onclick: initCamera }, 'Camera')
      )
    },
  }
}
