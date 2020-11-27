
import http from "../Http.js"
import {
  filterShowForUnselected,
  addUserShowsTask,
  onError,
  } from "./fns.js"
import {Modal} from 'components'

const addUserShows = (mdl) => (show, list) =>
  addUserShowsTask(mdl)(http)(show)(list).fork(onError(mdl)("search"), mdl.user.shows )

const showModal = (mdl, show) =>
    mdl.state.details.selected(show)


export const SearchPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return mdl.state.details.selected() ? m(Modal, {mdl})
      : m('ion-list',
          filterShowForUnselected(mdl).map(
            show =>
              m('ion-item-sliding',
                {onclick:() => showModal(mdl, show)},
                m('ion-item',
                m('ion-avatar', m('ion-img', { src: show.image })),
                m('ion-label',
                  m('h2', show.name),
                ),
              ),
                m('ion-item-options',
                {side:'start'},
                  mdl.user.lists().map(list => m('ion-item-option', {onclick:e=> addUserShows(mdl)(show,list)}, list))
              )
            )
        )
      )
    },
  }
}
