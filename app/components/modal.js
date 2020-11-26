import {modalController} from '@ionic/core'

const dismissModal = mdl => mdl.state.details.selected(null)

export const Modal = () => {
  const state = {}
  return {
    onremove: () =>
      state.modal.dismiss().then(state.modal = null)
    ,
    oncreate: ({ dom, attrs:{mdl} }) => {
      console.log(
        state,
        mdl.state.details.selected(),
      )
      modalController.create({ component: dom }).then(x => { state.modal = x; state.modal.present()})
    },
    view: ({ attrs: { mdl } }) =>
        m('ion-modal',
        m("ion-header",
          m("ion-toolbar",
              m("ion-title",
                mdl.state.details.selected().name
              ),
              m("ion-buttons", { "slot": "primary" },
                m("ion-button", { onclick: e => dismissModal(mdl) },
                  m("ion-icon", { "slot": "icon-only", "name": "close" })
                )
              )

          )),
         m('ion-content',m('ion-img', {slot: 'fixed', src:mdl.state.details.selected().img}))
    )
  }
}

