import { getTimeFormat, jsonCopy, hyphenize } from "Utils"
import { propEq, compose, not, head, pluck, set, lensProp } from "ramda"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventTask,
  deleteInviteTask,
  updateInviteTask,
  addItemTask,
  deleteItemTask,
  deleteEventTask,
  updateItemTask,
  sendInviteTask,
  addCommentTask,
  deleteCommentTask,
} from "Http"
import { AccordianItem, InviteRSVP } from "Components"
import {
  AngleLine,
  RemoveLine,
  MinusCircleLine,
  TimesCircleLine,
} from "@mithril-icons/clarity/cjs"
import Task from "data.task"
import { validateItemTask, validateCommentTask } from "./validations"

const isUserOrUnclaimed = (mdl) => (item) =>
  [mdl.User.objectId, null].includes(item.userId)

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    info: { show: Stream(false), map: { status: Stream(false) } },
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
    comments: {
      message: "",
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
    comments: [],
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

  const getUserFromId = (id) =>
    pluck("name", data.guests.filter(propEq("userId", id)))

  const updateEvent = ({ event, guests, items, comments }) => {
    data.event = event
    data.guests = guests
    data.comments = comments
    data.items = items
    state.error = {}
    state.status = "success"
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("load error", state, data, error)
    }

    loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()).fork(
      onError,
      updateEvent
    )
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
      let name = hyphenize(mdl.User.name)
      mdl.Invites.fetch(true)
      let date = M(data.event.start).format("YYYY-MM-DD")
      m.route.set(`/${name}/${date}`)
    }

    let isLast = !(data.guests.length - 1)

    let invite = isLast
      ? data.guests[0]
      : data.guests.filter(propEq("userId", mdl.User.objectId))[0]

    if (isLast) {
      pluck("objectId", data.items)
        .traverse(deleteItemTask(HTTP)(mdl), Task.of)
        .chain(() => deleteEventTask(HTTP)(mdl)(invite.eventId))
        .fork(onError, onSuccess)
    } else {
      data.items
        .filter(propEq("userId", mdl.User.objectId))
        .map(set(lensProp("userId"), null))
        .traverse(updateItemTask(HTTP)(mdl), Task.of)
        .chain(() => deleteInviteTask(HTTP)(mdl)(invite.objectId))
        .fork(onError, onSuccess)
    }
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
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
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
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, onSuccess)
  }

  const deleteItem = (mdl) => (itemId) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("delete item failed", error)
    }

    deleteItemTask(HTTP)(mdl)(itemId)
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, updateEvent)
  }

  const deleteComment = (mdl) => (commentId) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("delete comment failed", error)
    }

    deleteCommentTask(HTTP)(mdl)(commentId)
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
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
      eventId: mdl.Events.currentEventId(),
      name: state.items.name,
      quantity: parseInt(state.items.quantity),
    }

    state.items.isSubmitted(true)
    validateItemTask(item)(data)
      .chain(addItemTask(HTTP)(mdl))
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, onSuccess)
  }

  const sendMessage = (mdl) => {
    const onError = (error) => {
      state.comments.error(jsonCopy(error))
      console.log("add item failed", error)
      state.comments.status("failed")
    }

    const onSuccess = (eventData) => {
      state.comments.message = ""
      state.comments.error(null)
      state.comments.isSubmitted(false)
      updateEvent(eventData)
    }

    let comment = {
      message: state.comments.message,
      sender: mdl.User.name,
      userId: mdl.User.objectId,
      eventId: mdl.Events.currentEventId(),
    }

    state.comments.isSubmitted(true)
    validateCommentTask(comment)
      .chain(addCommentTask(HTTP)(mdl))
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
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
      updateEvent(eventData)
    }

    //move to Validations
    let hasBeenInvited = data.guests.filter(propEq("email", state.guests.email))
    if (hasBeenInvited.any()) {
      state.guests.error("Guest Has Already Been Invited")
      return state.guests.status("failed")
    }

    state.guests.error(null)
    sendInviteTask(HTTP)(mdl)(state.guests.email, data.event)
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, onSuccess)
  }

  const setupMap = ({ dom }) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYm9hemJsYWtlIiwiYSI6ImNqdWJ4OGk4YzBpYXU0ZG5wNDI1OGM0eTIifQ.5UV0HkEGPiKUzFdbgdr5ww"
    try {
      let coords = JSON.parse(data.event.latlong)

      const createMarker = () =>
        new mapboxgl.Marker().setLngLat(coords).addTo(map)

      let map = new mapboxgl.Map({
        container: dom,
        center: coords,
        zoom: 15,
        style: "mapbox://styles/mapbox/streets-v11?optimize=true",
      })
      state.info.map.status(true)
      createMarker()
    } catch (error) {
      state.info.map.status(false)
      return
    }
  }

  return {
    oninit: load,
    view: () => {
      return m(".event-page", [
        state.status == "loading" && m(".", "Fetching Event..."),
        state.status == "failed" && m(".code", state.error.message),
        state.status == "success" &&
          m(".width-100", [
            m(".event-page-heading", [
              m("h1.event-page-title.text-center", data.event.title),
              m(
                "h3.event-page-subheading",
                `${data.event.date} | ${data.event.startTime} - ${data.event.endTime}`
              ),
            ]),
            m(".accordian", [
              m(
                AccordianItem,
                { mdl, state, data, part: "info", title: "Info" },
                [
                  m("label", data.event.notes),

                  m(".events-map-container", {
                    style: { width: "100%", height: "250px" },
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
                      type: "email",
                      value: state.guests.email,
                      oninput: (e) =>
                        (state.guests.email = e.target.value.trim()),
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
                      m(InviteRSVP, {
                        mdl,
                        reload: () => mdl.Invites.fetch(true),
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
                          m(InviteRSVP, {
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
                      onchange: (e) =>
                        (state.items.name = state.items.name.trim()),
                      onblur: (e) => validate("items")(state.items),
                      type: "text",
                    }),
                    m("input.col-xs-1-4", {
                      placeholder: "quantity",
                      value: state.items.quantity,
                      oninput: (e) =>
                        (state.items.quantity = e.target.value.trim()),
                      onblur: (e) => validate("items")(state.items),
                      type: "number",
                      inputMode: "number",
                      pattern: "[0-9]*",
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
                                    isUserOrUnclaimed(mdl)(item) &&
                                      m(MinusCircleLine, {
                                        onclick: (e) => {
                                          item.userId = null
                                          updateItem(mdl)(item)
                                        },
                                        class: "smaller",
                                      }),
                                    getUserFromId(item.userId)
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
                          isUserOrUnclaimed(mdl)(item) &&
                            m(
                              ".events-remove-item",
                              m(
                                "span.clickable",
                                m(RemoveLine, {
                                  class: "smaller",
                                  onclick: (e) =>
                                    deleteItem(mdl)(item.objectId),
                                })
                              )
                            ),
                          m(".col-xs-2-3 frow column-center", [
                            isUserOrUnclaimed(mdl)(item) &&
                              m(
                                ".col-xs-1-3",
                                m(
                                  "span.clickable",
                                  m(AngleLine, {
                                    class: "smaller",
                                    onclick: (e) => {
                                      item.quantity++
                                      updateItem(mdl)(item)
                                    },
                                  })
                                )
                              ),
                            m(".col-xs-1-3 text-center pb-2", item.quantity),
                            isUserOrUnclaimed(mdl)(item) &&
                              m(
                                ".col-xs-1-3",
                                m(
                                  "span.clickable.smaller",
                                  m(AngleLine, {
                                    class: "decrement",
                                    onclick: (e) => {
                                      item.quantity--
                                      updateItem(mdl)(item)
                                    },
                                  })
                                )
                              ),
                          ]),
                        ]),
                      ])
                    )
                  ),
                ]
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "comments", title: "Comments" },
                m(".frow row-start", [
                  m(".frow width-100", [
                    m(
                      ".events-messages-container width-100",
                      {
                        oncreate: ({ dom }) =>
                          dom.scrollTo(0, dom.scrollHeight, "smooth"),
                      },

                      data.comments.any()
                        ? data.comments.map((comment) =>
                            m(
                              ".frow column-center width-100 mb-40",
                              m(
                                `.event-comments-message-container ${
                                  mdl.User.objectId == comment.userId
                                    ? "me"
                                    : "other"
                                }`,
                                m(".event-comments-message frow items-end", [
                                  m(".speech-bubble", [
                                    m("span.text-left", comment.message),
                                    mdl.User.objectId == comment.userId &&
                                      m(TimesCircleLine, {
                                        onclick: (e) =>
                                          deleteComment(mdl)(comment.objectId),
                                        class:
                                          "event-comments-message-remove smaller",
                                      }),
                                  ]),
                                  m(
                                    "label.event-comment-name",
                                    m(".frow row-between", [
                                      m("span", comment.sender),
                                      m(
                                        "span",
                                        M(comment.created).format(
                                          getTimeFormat(mdl)
                                        )
                                      ),
                                    ])
                                  ),
                                ])
                              )
                            )
                          )
                        : m("", "Start a conversation")
                    ),
                    m(
                      ".event-comment-textbox-container",
                      m(".frow items-end", [
                        m(
                          ".col-xs-4-5",
                          m("textarea.comments-message-container", {
                            row: 20,
                            cols: 50,
                            placeholder: "Say hi...",
                            value: state.comments.message,
                            oninput: (e) =>
                              (state.comments.message = e.target.value),
                            onchange: (e) =>
                              (state.comments.message = state.comments.message.trim()),
                            onblur: (e) => validate("comments")(state.comments),
                          })
                        ),
                        m(
                          ".col-xs-1-5",
                          m(
                            "button.button-none.comments-message-btn",
                            { onclick: (e) => sendMessage(mdl) },
                            "Send"
                          )
                        ),
                      ])
                    ),
                    state.comments.error() &&
                      m("code.error-field", state.comments.error().name),
                  ]),
                ])
              ),

              m(
                AccordianItem,
                { mdl, state, data, part: "settings", title: "Settings" },
                m(".frow row-start", [
                  m(
                    "button.btn",
                    { onclick: (e) => deleteInvite(mdl) },
                    "Delete"
                  ),
                  m(
                    "button.btn",
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
