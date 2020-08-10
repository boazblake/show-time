import { jsonCopy } from "Utils"
import { propEq } from "ramda"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventTask,
  deleteEventTask,
  updateInviteTask,
  addItemTask,
  deleteItemTask,
  updateItemTask,
  sendInviteTask,
} from "Http"
import { AccordianItem, AttendanceResponse } from "Components"
import { AddLine, AngleLine, RemoveLine } from "@mithril-icons/clarity/cjs"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false) },
    rsvp: {
      name: "",
      show: Stream(false),
      status: Stream("success"),
      error: Stream(null),
    },
    edit: { show: Stream(false) },
    items: { name: "", quantity: "", show: Stream(false) },
  }

  const data = {
    event: {},
    invites: [],
    items: [],
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = ({ event, invites, items = [] }) => {
      data.event = event
      data.invites = invites
      data.items = items
      state.error = {}
      state.status = "success"
      console.log(
        mdl.User.objectId,
        data.invites
        // data.invites.filter(propEq("userId", mdl.User.objectId))
      )
    }

    loadEventTask(HTTP)(mdl).fork(onError, onSuccess)
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

  const updateInvite = (mdl) => (invite) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = (invite) => {
      data.invite = invite
      console.log(data)
      state.error = {}
      state.status = "success"
    }

    updateInviteTask(HTTP)(mdl)(invite).fork(onError, onSuccess)
  }

  const updateItem = (mdl) => (item, idx) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = (item) => {
      data.items.removeAt(idx)
      data.items.insertAt(idx, item)
      state.error = {}
      state.items.name = ""
      state.items.quantity = ""
      state.status = "success"
    }

    updateItemTask(HTTP)(mdl)(item).fork(onError, onSuccess)
  }

  const deleteItem = (mdl) => (itemId) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = ({ event, invites, items }) => {
      data.items = items
      data.event = event
      data.invites = invites
      state.error = {}
      console.log("deleted s", state)
      state.status = "success"
    }

    deleteItemTask(HTTP)(mdl)(itemId)
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  const addItem = (mdl) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = ({ event, invites, items }) => {
      data.items = items
      data.event = event
      data.invites = invites
      state.error = {}
      state.items.name = ""
      state.items.quantity = ""
      console.log("add success", state)
      state.status = "success"
    }

    addItemTask(HTTP)(mdl)({
      name: state.items.name,
      quantity: state.items.quantity,
    })
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  const sendInvite = (mdl) => {
    const onError = (err) => {
      // console.log("error", state, err)
      state.rsvp.error(err)
      state.rsvp.status("failed")
    }

    const onSuccess = ({ event, invites, items }) => {
      data.items = items
      data.event = event
      data.invites = invites
      state.error = {}
      state.rsvp.email = ""
      console.log("invite add success", data)
      state.status = "success"
    }
    state.rsvp.error(null)
    sendInviteTask(HTTP)(mdl)(state.rsvp.email, data.event)
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
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
              m(
                AccordianItem,
                { mdl, state, data, part: "info", title: "Info" },
                [
                  m("label", data.event.notes),

                  m(".map", {
                    style: { width: "250px", height: "250px" },
                    oncreate: setupMap,
                  }),
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "rsvp", title: "RSVP" },
                m(".rsvp-container", [
                  m(".frow row", [
                    m("input.col-xs-4-5", {
                      placeholder: "email",
                      value: state.rsvp.email,
                      oninput: (e) => (state.rsvp.email = e.target.value),
                      type: "email",
                    }),

                    m(
                      "button.col-xs-1-5",
                      { onclick: (e) => sendInvite(mdl) },
                      m(AddLine)
                    ),

                    state.rsvp.error() &&
                      m("code.error-field", state.rsvp.error()),
                  ]),

                  m(".frow row-start", [
                    m(".col-xs-1-2", mdl.User.name),
                    m(
                      ".col-xs-1-2",
                      m(AttendanceResponse, {
                        mdl,
                        invite: "",
                        updateInvite,
                      })
                    ),
                  ]),
                  // JSON.stringify(data),
                  // data.invites.map((invite) =>
                  //   m(".frow row-start", [
                  //     m(".col-xs-1-2", mdl.User.name),
                  //     m(
                  //       ".col-xs-1-2",
                  //       m(AttendanceResponse, {
                  //         mdl,
                  //         invite: data.invite,
                  //         updateInvite,
                  //       })
                  //     ),
                  //   ])
                  // ),
                ])
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "items", title: "Items" },
                [
                  m(".frow row", [
                    m("input.col-xs-1-2", {
                      placeholder: "name",
                      value: state.items.name,
                      oninput: (e) => (state.items.name = e.target.value),
                      type: "text",
                    }),
                    m("input.col-xs-1-4", {
                      placeholder: "quantity",
                      value: state.items.quantity,
                      oninput: (e) => (state.items.quantity = e.target.value),
                      type: "number",
                      pattern: "mobile",
                    }),
                    m(
                      "button.col-xs-1-5",
                      { onclick: (e) => addItem(mdl) },
                      m(AddLine)
                    ),
                  ]),

                  m(
                    ".event-items",
                    data.items.map((i, idx) =>
                      m(".event-items-item frow ", [
                        m(
                          ".col-xs-1-2 ",
                          m(
                            "label",
                            m("h4", i.name),
                            i.userId || m("i", "click to select")
                          )
                        ),
                        m(".col-xs-1-2 frow items-center", [
                          m(".col-xs-1-3", i.quantity),
                          m(".col-xs-1-3 ", [
                            m(AngleLine, {
                              onclick: (e) => {
                                i.quantity++
                                updateItem(mdl)(i, idx)
                              },
                            }),
                            m(AngleLine, {
                              onclick: (e) => {
                                i.quantity--
                                updateItem(mdl)(i, idx)
                              },
                              class: "decrement",
                            }),
                          ]),
                          m(
                            ".col-xs-1-3",
                            m(RemoveLine, {
                              onclick: (e) => deleteItem(mdl)(i.objectId),
                            })
                          ),
                        ]),
                      ])
                    )
                  ),
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "edit", title: "Edit" },
                [m("button", { onclick: (e) => deleteEvent(mdl) }, "delete")]
              ),
            ]),
          ]),
      ])
    },
  }
}
