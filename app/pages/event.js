import { jsonCopy, hyphenize } from "Utils"
import { propEq, compose, not, head } from "ramda"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventTask,
  deleteInviteTask,
  updateInviteTask,
  addItemTask,
  deleteItemTask,
  updateItemTask,
  sendInviteTask,
} from "Http"
import { AccordianItem, AttendanceResponse } from "Components"
import { AddLine, AngleLine, RemoveLine } from "@mithril-icons/clarity/cjs"
import Task from "data.task"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false) },
    guests: {
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
    guests: [],
    items: [],
  }

  const updateEvent = ({ event, guests, items }) => {
    data.event = event
    data.guests = guests
    data.items = items
    state.error = {}
    state.status = "success"
    console.log("updated event")
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("load error", state, data, error)
    }

    loadEventTask(HTTP)(mdl).fork(onError, updateEvent)
  }

  const deleteInvite = (mdl) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("delete event failed", error)
    }

    const onSuccess = () => {
      state.error = {}
      state.status = "success"
      m.route.set(
        `/${hyphenize(mdl.User.name)}/${M(mdl.selectedDate()).format(
          "YYYY-MM-DD"
        )}`
      )
    }

    let invite =
      data.guests.length > 1
        ? data.guests.filter(propEq("userId", mdl.User.objectId))[0]
        : data.guests[0]

    console.log(invite, data.guests.length)

    deleteInviteTask(HTTP)(mdl)(invite.objectId)
      .chain((res) => {
        return data.guests.any()
          ? Task.of(res)
          : deleteEventTask(HTTP)(mdl)(invite.eventId)
      })
      .fork(onError, onSuccess)
  }

  const updateInvite = (mdl) => (update) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("invite update failed", state, update)
    }

    const onSuccess = (eventData) => {
      updateEvent(eventData)
    }

    updateInviteTask(HTTP)(mdl)(update)
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  const updateItem = (mdl) => (item, idx) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("update item failed", error)
    }

    const onSuccess = (eventData) => {
      // data.items.removeAt(idx)
      // data.items.insertAt(idx, item)
      // state.error = {}
      state.items.name = ""
      state.items.quantity = ""
      updateEvent(eventData)
    }

    updateItemTask(HTTP)(mdl)(item)
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  const deleteItem = (mdl) => (itemId) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("delete item failed", error)
    }

    deleteItemTask(HTTP)(mdl)(itemId)
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, updateEvent)
  }

  const addItem = (mdl) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      console.log("add item failed", error)
      state.status = "failed"
    }

    const onSuccess = (eventData) => {
      state.items.name = ""
      state.items.quantity = ""
      updateEvent(eventData)
    }

    addItemTask(HTTP)(mdl)({
      name: state.items.name,
      quantity: state.items.quantity,
    })
      .chain((_) => loadEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  const sendInvite = (mdl) => {
    const onError = (error) => {
      // console.log("error", state, error)
      state.guests.error(error)
      state.guests.status("failed")
    }

    const onSuccess = (eventData) => {
      state.guests.email = ""
      console.log("invite add success", data)
      updateEvent(eventData)
    }

    let hasBeenInvited = data.guests.filter(propEq("email", state.guests.email))
    if (hasBeenInvited.any()) {
      state.guests.error("Guest Has Already Been Invited")
      return state.guests.status("failed")
    }

    state.guests.error(null)
    sendInviteTask(HTTP)(mdl)(state.guests.email, data.event)
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
                { mdl, state, data, part: "guests", title: "guests" },
                m(".guests-container", [
                  m(".frow row", [
                    m("input.col-xs-4-5", {
                      placeholder: "email",
                      value: state.guests.email,
                      oninput: (e) => (state.guests.email = e.target.value),
                      type: "email",
                    }),

                    m(
                      "button.col-xs-1-5",
                      { onclick: (e) => sendInvite(mdl) },
                      m(AddLine)
                    ),

                    state.guests.error() &&
                      m("code.error-field", state.guests.error()),
                  ]),

                  m(".frow row-start", [
                    m(".col-xs-1-2", mdl.User.name),
                    m(
                      ".col-xs-1-2",
                      m(AttendanceResponse, {
                        mdl,
                        guest: head(
                          data.guests.filter(
                            propEq("userId", mdl.User.objectId)
                          )
                        ),
                        updateInvite,
                      })
                    ),
                  ]),
                  data.guests
                    .filter(compose(not, propEq("userId", mdl.User.objectId)))
                    .map((guest) =>
                      m(".frow row-start", [
                        m(".col-xs-1-2", guest.name),
                        m(
                          ".col-xs-1-2",
                          m(AttendanceResponse, {
                            mdl,
                            guest,
                            updateInvite,
                          })
                        ),
                      ])
                    ),
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
                [m("button", { onclick: (e) => deleteInvite(mdl) }, "delete")]
              ),
            ]),
          ]),
      ])
    },
  }
}
