
import http from "../Http.js"
import {
  filterShowForUnselected,
  addUserShowsTask,
  onError,
  } from "./fns.js"
import {Modal} from 'components'

const addUserShows = (mdl) => (show, list) =>
  addUserShowsTask(mdl)(http)(show)(list).fork(onError(mdl)("search"), mdl.user.shows)


const showModal = (mdl, show) =>
    mdl.state.details.selected(show)


export const SearchPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return mdl.state.details.selected() ? m(Modal, {mdl})
        : m('ion-list',
          {
            oncreate: ({ dom }) => {
              mdl.state.listDom = dom
              dom.closeSlidingItems()
            }
          },
          filterShowForUnselected(mdl).map(
            (show, idx) =>
              m('ion-item-sliding',
                {
                  key: idx,
                },
                m('ion-item',
                  {onclick:() => showModal(mdl, show)},
                  m('ion-thumbnail', {style:{'border-radius': '0'}}, m('ion-img', { src: show.image })),
                m('ion-label',
                  m('h2', show.name),
                ),
              ),
                m('ion-item-options',
                {side:'start'},
                  mdl.user.lists().map(list => m('ion-item-option', {
                    onclick: () => {
                      addUserShows(mdl)(show, list)
                      mdl.state.listDom.closeSlidingItems()
                    }
                  }, list))
              )
            )
        )
      )
    },
  }
}
