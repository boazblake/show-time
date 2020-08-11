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
import {
  AddLine,
  AngleLine,
  RemoveLine,
  MinusCircleLine,
} from "@mithril-icons/clarity/cjs"
import Task from "data.task"
import { validateItemTask } from "./validations"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false) },
    settings: { show: Stream(false) },
    guests: {
      name: "",
      show: Stream(false),
      status: Stream("success"),
      isSubmitted: Stream(false),
      error: Stream(null),
    },
    items: {
      name: "",
      quantity: "",
      show: Stream(false),
      error: Stream(null),
      status: Stream("success"),
      isSubmitted: Stream(false),
    },
  }

  const data = {
    event: {},
    guests: [],
    items: [],
  }

  const validate = (field) => (input) => {
    const onSuccess = (input) => {
      state[field].status("success")
      state[field].error(null)
    }

    const onError = (error) => {
      state[field].status("failed")
      state[field].error(error)
    }

    let validateTask = {
      items: validateItemTask,
    }

    state[field].isSubmitted() &&
      validateTask[field](input)(data).fork(onError, onSuccess)
  }

  const getUserFromId = (id) => head(data.guests.filter(propEq("userId", id)))

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

  const updateItem = (mdl) => (item) => {
    const onError = (error) => {
      state.items.error(jsonCopy(error))
      state.items.status("failed")
      console.log("update item failed", error)
    }

    const onSuccess = (eventData) => {
      state.items.name = ""
      state.items.quantity = ""
      updateEvent(eventData)
    }

    state.items.isSubmitted(true)
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
      state.items.error(jsonCopy(error))
      console.log("add item failed", error)
      state.items.status("failed")
    }

    const onSuccess = (eventData) => {
      state.items.name = ""
      state.items.quantity = ""
      state.items.error(null)
      state.items.isSubmitted(false)
      updateEvent(eventData)
    }

    let item = {
      name: state.items.name,
      quantity: state.items.quantity,
    }

    state.items.isSubmitted(true)
    validateItemTask(item)(data)
      .chain((x) => {
        console.log("data??", x)
        return addItemTask(HTTP)(mdl)(x)
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
      state.guests.error(null)
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
                {
                  mdl,
                  state,
                  data,
                  part: "guests",
                  title: "Guests",
                  pills: [m(".pill", data.guests.length)],
                },
                m(".guests-container", [
                  m(".frow row event-input-group", [
                    m("input.col-xs-4-5", {
                      placeholder: "email",
                      value: state.guests.email,
                      oninput: (e) => (state.guests.email = e.target.value),
                      type: "email",
                    }),

                    m(
                      "button.btn.col-xs-1-5.button-none",
                      { onclick: (e) => sendInvite(mdl) },
                      "Invite"
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
                {
                  mdl,
                  state,
                  data,
                  part: "items",
                  title: "Items",
                  pills: [m(".pill", data.items.length)],
                },
                [
                  m(".frow row event-input-group", [
                    m("input.col-xs-1-2", {
                      placeholder: "name",
                      value: state.items.name,
                      oninput: (e) => (state.items.name = e.target.value),
                      onblur: (e) => validate("items")(state.items),
                      type: "text",
                    }),
                    m("input.col-xs-1-4", {
                      placeholder: "quantity",
                      value: state.items.quantity,
                      oninput: (e) => (state.items.quantity = e.target.value),
                      onblur: (e) => validate("items")(state.items),
                      type: "number",
                      pattern: "mobile",
                    }),
                    m(
                      "button.btn.col-xs-1-5.button-none",
                      { onclick: (e) => addItem(mdl) },
                      "Add"
                    ),
                    state.items.error() &&
                      m("code.error-field", state.items.error().name),
                    state.items.error() &&
                      m("code.error-field", state.items.error().quantity),
                  ]),

                  m(
                    ".event-items",
                    data.items.map((item) =>
                      m(".event-items-item frow ", [
                        m(
                          ".col-xs-2-3 ",
                          m("h4", item.name),
                          m(
                            "label",
                            item.userId
                              ? [
                                  m(
                                    "span.clickable.frow row-start",
                                    m(MinusCircleLine, {
                                      onclick: (e) => {
                                        item.userId = null
                                        updateItem(mdl)(item)
                                      },
                                      class: "smaller",
                                    }),
                                    getUserFromId(item.userId).name
                                  ),
                                ]
                              : m(
                                  "i.clickable",
                                  {
                                    onclick: (e) => {
                                      item.userId = mdl.User.objectId
                                      updateItem(mdl)(item)
                                    },
                                  },
                                  "click to select item"
                                )
                          )
                        ),
                        m(".col-xs-1-3 frow items-center", [
                          m(".col-xs-2-3 frow column-center", [
                            m(
                              "span.clickable",
                              m(AngleLine, {
                                class: "smaller",
                                onclick: (e) => {
                                  item.quantity++
                                  updateItem(mdl)(item)
                                },
                              })
                            ),
                            item.quantity,
                            m(
                              "span.clickable.smaller",
                              m(AngleLine, {
                                class: "decrement",
                                onclick: (e) => {
                                  item.quantity--
                                  updateItem(mdl)(item)
                                },
                              })
                            ),
                          ]),
                          m(
                            ".col-xs-1-3 frow column-centered",
                            mdl.User.objectId == item.userId &&
                              m(
                                "span.clickable",
                                m(RemoveLine, {
                                  class: "smaller",
                                  onclick: (e) =>
                                    deleteItem(mdl)(item.objectId),
                                })
                              )
                          ),
                        ]),
                      ])
                    )
                  ),
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "settings", title: "Settings" },
                m(".frow row-start", [
                  m("button", { onclick: (e) => deleteInvite(mdl) }, "Delete"),
                  m(
                    "button",
                    { onclick: (e) => console.log("edit event ...") },
                    "Edit"
                  ),
                ])
              ),
            ]),
          ]),
      ])
    },
  }
}
