import {modalController} from '@ionic/core'
import http from '../Http'
import { getShowDetailsTask, updateShowDetailsTask } from '../pages/fns'

  const state = {
    show: '',
    modal: null
  }

const dismissModal = mdl =>
  mdl.state.details.selected(null)

  const onError = err => {
    state.error = err
  }
const onSuccess = show => {
    console.log(show)
    state.show = show
  }


const updateShowDetails = mdl => update => updateShowDetailsTask(mdl)(http)(update).chain(_=>getShowDetailsTask(http)(mdl.state.details.selected().objectId)).fork(onError, onSuccess)

const getShowDetails = mdl=>
  getShowDetailsTask(http)(mdl.state.details.selected().objectId).fork(onError, onSuccess)



export const Modal = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowDetails(mdl, state),
    oncreate: ({ dom }) => {
      modalController
        .create({
          component: dom,
        backdropDismiss:false})
        .then(modal => { state.modal = modal; state.modal.present() })
    },
    onremove: ({ attrs: { mdl } }) =>
      state.modal&& state.modal.dismiss().then(() => {
          state.modal = null
          state.show = null
          dismissModal(mdl)
      }),
    onbeforeremove: ({ attrs: { mdl } }) =>
      state.modal.dismiss().then(() => {
          state.modal = null
          state.show = null
          dismissModal(mdl)
      }),
    view: ({ attrs: { mdl } }) =>
    m('ion-modal-view',
    state.show &&
        m("ion-header",
          m("ion-toolbar",
            m("ion-title",
              `${state.show.name} - ${state.show.premiered.split('-')[0]} | ${state.show.network}`
              ),
              m("ion-buttons", { "slot": "primary" },
                m("ion-button", { onclick: e => dismissModal(mdl) },
                  m("ion-icon", { "slot": "icon-only", "name": "close" })
                )
              )

          )),
      state.show &&
      m('ion-content', {
                padding: true
          },
            m('ion-img', { style: { width: '50%' }, src: state.show.image }),
            m('',
              m.trust(state.show.summary),
              m('pre', `list status: ${state.show.listStatus}`),
              m('pre', `status: ${state.show.status}`),
              m('ion-textarea', {
                placeholder: 'Notes', value: state.show.notes,
                onkeyup: e => state.show.notes = e.target.value
              }),
              m('ion-button', {onclick:()=>updateShowDetails(mdl)({notes:state.show.notes})}, 'Save note'),
              m('', JSON.stringify(state.show) ) ,
            )
          )
          ),

  }
}

