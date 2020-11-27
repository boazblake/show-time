import {modalController} from '@ionic/core'
import http from '../Http'
import { getShowDetailsTask, updateShowDetailsTask,getEpisodeTask , getShowTvMazeDetailsTask, addUserShowsTask} from '../pages/fns'



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

const addUserShows = (mdl) => (show, list) =>
  addUserShowsTask(mdl)(http)(show)(list).fork(onError, shows => { mdl.user.shows(shows); dismissModal(mdl)} )


const updateShowDetails = mdl => update => updateShowDetailsTask(mdl)(http)(update).chain(_=>getShowDetailsTask(http)(mdl.state.details.selected().objectId)).fork(onError, onSuccess)

const getShowDetails = mdl =>
  mdl.state.details.selected().objectId
    ? getShowDetailsTask(http)(mdl.state.details.selected().objectId).fork(onError, onSuccess)
    : getShowTvMazeDetailsTask(http)(mdl.state.details.selected()).fork(onError, onSuccess)


const Episode = () => {
  let epsData = undefined
  const getEpisode = (mdl) => (episode) =>
    getEpisodeTask(http)(episode).fork(
      onError,
      (s) => { console.log(s);(epsData = s)}
    )

  return {
    oninit: ({ attrs: { mdl, ep:{ href} } }) => getEpisode(mdl)(href),
    view: ({ attrs: {  ep:{label} } }) =>
      epsData &&
      m(".", [
        m('h3',label),
        m("ion-img", {
          src: epsData.image
        }),
        m('ion-item',
          m('ion-label', epsData.name), m('p', epsData.airdate) ,
          m('ion-label', 'Season - Ep:'), m('p', `${epsData.season} - ${epsData.number}`)
        )
      ])
  }
}


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
              `${state.show.name} - ${state.show.premiered.split('-')[0]} | ${state.show.network || state.show.webChannel}`
              ),
              m("ion-buttons", { slot: "primary" },
                m("ion-button", { onclick: e => dismissModal(mdl) },
                  m("ion-icon", { slot: "icon-only", name: "close" })
                )
              ),
          ),
          !state.show.listStatus && m('ion-item',
            m('ion-label', 'Add to: '),
            m("ion-buttons",
                mdl.user.lists().map(list => m('ion-button', { onclick: e => addUserShows(mdl)(state.show, list) }, list))
            )
          )
        ),
      state.show &&
      m('ion-content', {
                padding: true
          },
            m('ion-img', { style: { width: '50%' }, src: state.show.image }),
            m('',
              m.trust(state.show.summary),
              m('pre', `status: ${state.show.status}`),
              state.show.listStatus && [m('pre', `list status: ${state.show.listStatus}`),
              m('ion-textarea', {
                placeholder: 'Notes', value: state.show.notes,
                onkeyup: e => state.show.notes = e.target.value
              }),
              m('ion-button', { onclick: () => updateShowDetails(mdl)({ notes: state.show.notes }) }, 'Save note')],
              m('h3', 'Episodes'),
              state.show.links.map(ep => m(Episode, {mdl, ep})),
              // m('', JSON.stringify(state.show) ) ,
            )
          )
          ),

  }
}

