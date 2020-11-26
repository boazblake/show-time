
import http from "../Http.js"
import {
  getShows,
  filterShowsByListType,
  deleteShowTask,
  onError
} from "./fns.js"
import { isEmpty } from "ramda"

 const deleteShow = (mdl) => (show) =>
    deleteShowTask(http)(show.objectId).fork(
      onError(mdl)("details"),
      (updatedShows) => {
        m.route.set("/home")
        mdl.user.shows(updatedShows)
      }
    )

const getShowsTask = (mdl) => (http) =>
  getShows(http).fork(mdl.errors, mdl.user.shows)

export const Home = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowsTask(mdl)(http),
    view: ({ attrs: { mdl } }) => {
      return  m('ion-list',
          filterShowsByListType(mdl).map(
            show =>
              show.listStatus == mdl.state.currentList() &&
              m('ion-item-sliding',
                m('ion-item',
                m('ion-avatar', m('ion-img', { src: show.image })),
                m('ion-label',
                  m('h2', show.name),
                  m('h3', show.listStatus),
                  m('p', show.notes)
                ),
              ),
              m('ion-item-options', {
                side: 'end',
              },
                m('ion-item-option', {
                  color: 'danger',
                  onclick: ()=> deleteShow(mdl)(show)
                }, 'Delete'))
            )
        )
      )
    },
  }
}
