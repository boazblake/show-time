import { without } from "ramda"
import http from "../Http.js"
import {
  getShows,
  filterShowsByListType,
  updateUserShowsTask,
  deleteShowTask,
  onError
} from "./fns.js"
import { Modal } from 'components'
import {sortBy, prop} from 'ramda'


const updateUserShows = (mdl) => (show, list) =>
  updateUserShowsTask(mdl)(http)(show)(list).fork(
    onError(mdl)("search"),
    (updatedShows) => {
      m.route.set("/home")
      mdl.user.shows(sortBy(prop('name'),updatedShows))
    }
  )


const deleteShow = (mdl) => (show) =>
  deleteShowTask(http)(show.objectId).fork(
    onError(mdl)("details"),
    (updatedShows) => {
      m.route.set("/home")
      mdl.user.shows(sortBy(prop('name'),updatedShows))
    }
    )

const getShowsTask = (mdl) => (http) =>
  getShows(http).fork(mdl.errors, mdl.user.shows)

const showModal = (mdl, show) =>
    mdl.state.details.selected(show)


const otherList = (mdl) =>  without([mdl.state.currentList()], mdl.user.lists())[0]

export const Home = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowsTask(mdl)(http),
    view: ({ attrs: { mdl } }) => {
      return mdl.state.details.selected() ? m(Modal, {mdl})
        : m('ion-list',
          {
            oncreate: ({ dom }) => {
              mdl.state.listDom = dom
              dom.closeSlidingItems()
            }
          },
          sortBy(prop('name'), filterShowsByListType(mdl)).map(
            (show) =>
              // show.listStatus == mdl.state.currentList() &&
              m('ion-item-sliding',
                m('ion-item',
                  {
                    onclick: () => {
                      showModal(mdl, show)
                      mdl.state.listDom.closeSlidingItems()
                    }
                  },
                m('ion-thumbnail', m('ion-img', { src: show.image })),
                  m('ion-label',
                  {style:{paddingLeft:'12px'}},
                  m('h2', show.name),
                  m('p', m('i',show.status)),
                  m('p', show.notes)
                ),
                ),
                m('ion-item-options',
                  {
                       side: 'start',
                  },
                m('ion-item-option', {
                  onclick: () => {
                    updateUserShows(mdl)(show, otherList(mdl))
                    mdl.state.listDom.closeSlidingItems()
                  }
                }, `move to ${otherList(mdl)}`)
                ),
                m('ion-item-options',
                 m('ion-item-option', {
                  color: 'danger',
                  side: 'end',
                   onclick: () => {
                     deleteShow(mdl)(show)
                     mdl.state.listDom.closeSlidingItems()
                   }
                  }, 'Delete'))
            )
        )
      )
    },
  }
}
