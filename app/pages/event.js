import { jsonCopy, inviteOptions } from "Utils"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventAndInviteTask,
  deleteEventTask,
  updateInviteTask,
} from "Http"
import { AngleLine } from "@mithril-icons/clarity/cjs"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false) },
    rsvp: { show: Stream(false) },
    edit: { show: Stream(false) },
  }

  const data = {
    event: {},
    invite: {},
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = ({ event, invite }) => {
      data.event = event
      data.invite = invite
      state.error = {}
      // console.log("loaded event", data, state.info.show())
      state.status = "success"
    }

    loadEventAndInviteTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  const deleteEvent = (mdl) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = () => {
      state.error = {}
      state.status = "success"
      m.route.set(
        `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
      )
    }

    deleteEventTask(HTTP)(mdl)(mdl.Events.currentEventId()).fork(
      onError,
      onSuccess
    )
  }

  const updateInvite = (mdl) => (data) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = () => {
      state.error = {}
      state.status = "success"
    }

    updateInviteTask(HTTP)(mdl)(data).fork(onError, onSuccess)
  }

  const setupMap = ({ dom }) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYm9hemJsYWtlIiwiYSI6ImNqdWJ4OGk4YzBpYXU0ZG5wNDI1OGM0eTIifQ.5UV0HkEGPiKUzFdbgdr5ww"
    let coords = JSON.parse(data.event.latlong)

    const createMarker = () =>
      new mapboxgl.Marker().setLngLat(coords).addTo(map)

    let map = new mapboxgl.Map({
      container: dom,
      center: coords,
      zoom: 15,
      style: "mapbox://styles/mapbox/streets-v11",
    })

    createMarker()
  }

  return {
    oninit: load,
    view: () => {
      return m(".event-page", [
        state.status == "loading" && m(".", "Fetching Event..."),
        state.status == "failed" && m(".code", state.error.message),
        state.status == "success" &&
          m(".centered-column", [
            m("h1.", data.event.title),
            m(
              "h3",
              `${data.event.date} | ${data.event.startTime} - ${data.event.endTime}`
            ),

            m(".accordian", [
              m(".accordian-item.full-width", [
                m(".accordian-item-title", [
                  m(
                    ".frow",
                    m(".col-xs-1-2", m("h4", "INFO")),
                    m(
                      ".frow row-end col-xs-1-3",
                      m(
                        `.accordian-item-btn-${
                          state.info.show() ? "open" : "close"
                        }`,
                        {
                          onclick: (e) =>
                            state["info"].show(!state["info"].show()),
                        },
                        m(AngleLine)
                      )
                    )
                  ),
                ]),

                state.info.show() &&
                  m(".accordian-item-body.column", [
                    m("label", data.event.notes),

                    m(".map", {
                      style: { width: "250px", height: "250px" },
                      oncreate: setupMap,
                    }),
                  ]),
              ]),

              m(".accordian-item.full-width", [
                m(".accordian-item-title", [
                  m(
                    ".frow",
                    m(".col-xs-1-2", m("h4", "RSVP")),
                    m(
                      ".frow row-end col-xs-1-3",
                      m(
                        `.accordian-item-btn-${
                          state.rsvp.show() ? "open" : "close"
                        }`,
                        {
                          onclick: (e) =>
                            state["rsvp"].show(!state["rsvp"].show()),
                        },
                        m(AngleLine)
                      )
                    )
                  ),
                ]),
                state.rsvp.show() &&
                  m(".accordian-item-body.column", [
                    m(
                      "label",
                      m(
                        "select",
                        {
                          oninput: (e) => {
                            data.invite.status = inviteOptions.indexOf(
                              e.target.value
                            )
                            updateInvite(mdl)(data.invite)
                          },
                          value: inviteOptions[data.invite.status],
                        },
                        inviteOptions.map((opt, idx) =>
                          m(
                            "option",
                            {
                              value: opt,
                              key: idx,
                              id: idx,
                            },
                            opt.toUpperCase()
                          )
                        )
                      ),
                      "Status: "
                    ),
                  ]),
              ]),

              m(".accordian-item.full-width", [
                m(".accordian-item-title", [
                  m(
                    ".frow",
                    m(".col-xs-1-2", m("h4", "EDIT EVENT")),
                    m(
                      ".frow row-end col-xs-1-3",
                      m(
                        `.accordian-item-btn-${
                          state.edit.show() ? "open" : "close"
                        }`,
                        {
                          onclick: (e) =>
                            state["edit"].show(!state["edit"].show()),
                        },
                        m(AngleLine)
                      )
                    )
                  ),
                ]),
                state.edit.show() &&
                  m(".accordian-item-body.column", [
                    m("button", { onclick: (e) => deleteEvent(mdl) }, "delete"),
                  ]),
              ]),
            ]),
          ]),
      ])
    },
  }
}
