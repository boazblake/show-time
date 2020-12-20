import http from "Http"
import { without, sortBy, prop } from "ramda"
import {
  filterShowsByListType,
  deleteShowTask,
  updateUserShowsTask,
  onError,
} from "../pages/fns"

const getMoreData = (e) => setTimeout(() => (e.target.disabled = true), 2000)

const showModal = (mdl, show) => mdl.state.details.selected(show)

const otherList = (mdl) => without([mdl.state.currentList()], mdl.user.lists)[0]

const updateUserShows = (mdl) => (show, list) =>
  updateUserShowsTask(mdl)(http)(show)(list).fork(
    onError(mdl)("search"),
    (updatedShows) => {
      m.route.set("/home")
      mdl.user.shows = sortBy(prop("name"), updatedShows)
    }
  )

const deleteShow = (mdl) => (show) =>
  deleteShowTask(mdl)(http)(show.objectId).fork(
    onError(mdl)("details"),
    (updatedShows) => {
      m.route.set("/home")
      mdl.user.shows = sortBy(prop("name"), updatedShows)
    }
  )

export const List = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "section.list",
        { onionInfinite: getMoreData },
        m(
          "ion-list",
          {
            oncreate: ({ dom }) => {
              mdl.state.listDom = dom
              dom.closeSlidingItems()
            },
          },
          sortBy(prop("name"), filterShowsByListType(mdl)).map((show) =>
            m(
              "ion-item-sliding",
              m(
                "ion-item",
                {
                  onclick: () => {
                    showModal(mdl, show)
                    mdl.state.listDom.closeSlidingItems()
                  },
                },
                m("ion-thumbnail", m("ion-img", { src: show.image })),
                m(
                  "ion-label",
                  { style: { paddingLeft: "12px" } },
                  m("h2", show.name),
                  m("p", m("i", show.status)),
                  m("p", show.notes)
                )
              ),
              m(
                "ion-item-options",
                {
                  side: "start",
                },
                m(
                  "ion-item-option",
                  {
                    onclick: () => {
                      updateUserShows(mdl)(show, otherList(mdl))
                      mdl.state.listDom.closeSlidingItems()
                    },
                  },
                  `move to ${otherList(mdl)}`
                )
              ),
              m(
                "ion-item-options",
                m(
                  "ion-item-option",
                  {
                    color: "danger",
                    side: "end",
                    onclick: () => {
                      deleteShow(mdl)(show)
                      mdl.state.listDom.closeSlidingItems()
                    },
                  },
                  "Delete"
                )
              )
            )
          )
        ),
        m(
          "ion-infinite-scroll",
          { threshold: "100px", id: "infinite-scroll" },
          m("ion-infinite-scroll-content", {
            "loading-spinner": "dots",
            "loading-text": "Checking for more shows...",
          })
        )
      ),
  }
}
