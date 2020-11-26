
import http from "../Http.js"
import {
  filterShowForUnselected,
  // updateUserShowsTask,
  addUserShowsTask,
  onError,
  // updateShowStatus
} from "./fns.js"

const onSuccess = (mdl) => (d) => {
  console.log(mdl.user.shows(), d, mdl.data.shows())
  mdl.user.shows(d)
  // updating the mdl.data with show details from the user list and the search results list.
  // mdl.data.shows(updateShowStatus(mdl.user.shows())(mdl.data.shows()))
}

// const updateUserShows = (mdl) => (show, list) =>
//   updateUserShowsTask(http)(show)(list).fork(
//     onError(mdl)("search"),
//     onSuccess(mdl)
//   )

const addUserShows = (mdl) => (show, list) =>  addUserShowsTask(mdl)(http)(show)(list).fork(
    onError(mdl)("search"),
    onSuccess(mdl)
    )



export const SearchPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".search", m('ion-list',
          filterShowForUnselected(mdl).map(
            show =>
              m('ion-item-sliding',
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
      )
    },
  }
}
