import { modalController } from "@ionic/core"
import http from "../Http"
import {
  getShowDetailsTask,
  updateShowDetailsTask,
  getEpisodeTask,
  getShowTvMazeDetailsTask,
  addUserShowsTask,
  makeToast,
} from "../pages/fns"
import { sortBy, prop } from "ramda"

const state = {
  show: "",
  modal: null,
  status: null,
}

const updateUserShows = (mdl) => (dto) =>
  mdl.user.shows(
    sortBy(
      prop("name"),
      mdl.user
        .shows()
        .filter((show) => show.tvmazeId !== dto.tvmazeId)
        .concat([dto])
    )
  )

const dismissModal = (mdl) => mdl.state.details.selected(null)

const onError = (mdl) => (err) => {
  let msg = JSON.parse(JSON.stringify(err)).response.message
  state.error = err
  makeToast({ mdl, status: false, msg })
}

const onSuccess = (show) => {
  state.show = show
  state.error = null
}

const addUserShows = (mdl) => (show, list) =>
  addUserShowsTask(mdl)(http)(show)(list).fork(onError(mdl), (shows) => {
    mdl.user.shows(shows)
    dismissModal(mdl)
  })

const updateShowDetails = (mdl) => (update) =>
  updateShowDetailsTask(mdl)(http)(update)
    .chain((_) =>
      getShowDetailsTask(mdl)(http)(mdl.state.details.selected().objectId)
    )
    .fork(onError(mdl), (dto) => {
      updateUserShows(mdl)(dto)
      onSuccess(dto)
      makeToast({ mdl, status: true, msg: "Show successfully updated" })
    })

const getShowDetails = (mdl) =>
  mdl.state.details.selected().objectId
    ? getShowDetailsTask(mdl)(http)(mdl.state.details.selected().objectId).fork(
        onError(mdl),
        onSuccess
      )
    : getShowTvMazeDetailsTask(http)(mdl.state.details.selected()).fork(
        onError(mdl),
        onSuccess
      )

const Episode = () => {
  let data
  const getEpisode = (mdl) => (episode) =>
    getEpisodeTask(http)(episode).fork(onError(mdl), (dto) => (data = dto))

  return {
    oninit: ({
      attrs: {
        mdl,
        ep: { href },
      },
    }) => getEpisode(mdl)(href),
    onremove: () => (data = null),
    view: ({
      attrs: {
        ep: { label },
      },
    }) =>
      data &&
      m(".", [
        m("h3", label),
        m("ion-img", {
          src: data.image,
        }),
        m(
          "ion-item",
          m("ion-label", data.name),
          m("p", data.airdate),
          m("ion-label", "Season - Ep:"),
          m("p", `${data.season} - ${data.number}`)
        ),
      ]),
  }
}

export const Modal = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowDetails(mdl, state),
    oncreate: ({ dom }) => {
      modalController
        .create({
          component: dom,
          backdropDismiss: false,
        })
        .then((modal) => {
          state.modal = modal
          state.modal.present()
        })
    },
    onremove: ({ attrs: { mdl } }) =>
      state.modal &&
      state.modal.dismiss().then(() => {
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
      m(
        "ion-modal-view",
        state.show && [
          m(
            "ion-header",
            m(
              "ion-toolbar",
              m(
                "ion-title",
                `${state.show.name} - ${
                  state.show.premiered && state.show.premiered.split("-")[0]
                } | ${state.show.network || state.show.webChannel}`
              ),
              m(
                "ion-buttons",
                { slot: "primary" },
                m(
                  "ion-button",
                  { onclick: (e) => dismissModal(mdl) },
                  m("ion-icon", { slot: "icon-only", name: "close" })
                )
              )
            ),
            !state.show.listStatus &&
              m(
                "ion-item",
                m("ion-label", "Add to: "),
                m(
                  "ion-buttons",
                  mdl.user
                    .lists()
                    .map((list) =>
                      m(
                        "ion-button.ion-activatable ripple-parent",
                        { onclick: (e) => addUserShows(mdl)(state.show, list) },
                        m("ion-ripple"),
                        list
                      )
                    )
                )
              )
          ),
          m(
            "ion-content",
            {
              padding: true,
            },
            m(
              "ion-grid",
              m(
                "ion-row",
                m("ion-col", m("ion-img", { src: state.show.image })),
                m("ion-col", m.trust(state.show.summary))
              ),
              m(
                "ion-row",
                m("ion-col", m("pre", `status: ${state.show.status}`)),
                m(
                  "ion-col",
                  state.show.listStatus &&
                    m("pre", `list status: ${state.show.listStatus}`)
                )
              ),
              state.show.listStatus &&
                m(
                  "ion-row",
                  m("ion-textarea", {
                    placeholder: "Notes",
                    value: state.show.notes,
                    onchange: (e) => (state.show.notes = e.target.value),
                  }),
                  m(
                    "ion-button",
                    {
                      onclick: () =>
                        updateShowDetails(mdl)({ notes: state.show.notes }),
                    },
                    "Save note"
                  )
                )
            ),
            m(
              "",
              m("h3", "Episodes"),
              state.show.links.map((ep) => m(Episode, { mdl, ep }))
            )
          ),
        ]
      ),
  }
}
