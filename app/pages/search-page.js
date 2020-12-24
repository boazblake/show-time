import http from "../Http.js"
import { filterShowForUnselected, addUserShowsTask, onError } from "./fns.js"
import { Modal, Card } from "components"

const addUserShows = (mdl) => (show, list) =>
  addUserShowsTask(mdl)(http)(show)(list).fork(
    onError(mdl)("search"),
    (shows) => (mdl.user.shows = shows)
  )

const showModal = (mdl, show) => mdl.state.details.selected(show)

export const SearchPage = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return mdl.state.details.selected()
        ? m(Modal, { mdl })
        : mdl.state.isLoading()
        ? m("ion-spinner", { color: "primary", name: "crescent" })
        : m(
            "ion-list",
            {
              oncreate: ({ dom }) => {
                mdl.state.listDom = dom
                dom.closeSlidingItems()
              },
            },
            filterShowForUnselected(mdl).any()
              ? filterShowForUnselected(mdl).map((show, idx) =>
                  m(
                    "ion-item-sliding",
                    {
                      key: idx,
                    },
                    m(
                      "ion-item",
                      { onclick: () => showModal(mdl, show) },
                      m(
                        "ion-thumbnail",
                        { style: { "border-radius": "0" } },
                        m("ion-img", { src: show.image })
                      ),
                      m(
                        "ion-label",
                        { style: { paddingLeft: "12px" } },
                        m("h2", show.name)
                      )
                    ),
                    m(
                      "ion-item-options",
                      { side: "start" },
                      mdl.user.lists.map((list) =>
                        m(
                          "ion-item-option",
                          {
                            onclick: () => {
                              addUserShows(mdl)(show, list)
                              mdl.state.listDom.closeSlidingItems()
                            },
                          },
                          list
                        )
                      )
                    )
                  )
                )
              : // m(Card, {
                // header: [],
                // content:
                m("ion-slides", m("ion-slide", "Search For Shows"))
            //   footer: [],
            // })
          )
    },
  }
}
