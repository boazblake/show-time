import { getTimeFormat, jsonCopy, hyphenize, getTheme, autoFocus } from "Utils"
import {
  without,
  propEq,
  compose,
  not,
  head,
  pluck,
  set,
  lensProp,
  traverse,
  find,
} from "ramda"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventTask,
  deleteInviteTask,
  updateEventTask,
  updateInviteTask,
  addItemToEventTask,
  deleteItemTask,
  deleteEventTask,
  sendInviteTask,
  addCommentTask,
  deleteCommentTask,
  updateItemTask,
  updateItemToGuestTask,
} from "Http"
import { AccordianItem, InviteRSVP, Modal } from "Components"
import {
  AngleLine,
  RemoveLine,
  MinusCircleLine,
  TimesCircleLine,
  WarningStandardLine,
} from "@mithril-icons/clarity/cjs"
import Task from "data.task"
import { validateItemTask, validateCommentTask } from "./validations"

const isUserItem = (mdl) => (item) => mdl.User.objectId == item.guestId

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    status: "loading",
    selected: Stream(null),
    settings: { show: Stream(false) },
    modal: {
      isShowing: Stream(false),
      newHost: Stream(null),
    },
    info: {
      show: Stream(false),
      isShowing: Stream(true),
      map: { status: Stream(false) },
    },
    guests: {
      name: "",
      show: Stream(false),
      isShowing: Stream(false),
      status: Stream("success"),
      isSubmitted: Stream(false),
      error: Stream(null),
    },
    items: {
      name: "",
      quantity: "",
      show: Stream(false),
      isShowing: Stream(false),
      error: Stream(null),
      status: Stream("success"),
      isSubmitted: Stream(false),
      updateGuest: Stream(false),
    },
    comments: {
      message: "",
      show: Stream(false),
      isShowing: Stream(false),
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

  const showTab = (tab) => {
    state.info.isShowing(false)
    state.guests.isShowing(false)
    state.comments.isShowing(false)
    state.items.isShowing(false)
    state[tab].isShowing(true)
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
    pluck("name", data.guests.filter(propEq("guestId", id)))

  const updateEventView = ({ event, guests, items, comments }) => {
    data.event = event
    data.guests = guests
    data.comments = comments
    data.items = items
    state.error = {}
    state.status = "success"
    state.modal.isShowing(null)
    state.modal.newHost(null)
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("load error", state, data, error)
    }

    loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()).fork(
      onError,
      updateEventView
    )
  }

  const deleteEvent = (invite) => {
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
    console.log(invite)
    deleteEventTask(HTTP)(mdl)(invite.eventId).fork(onError, onSuccess)
  }

  const leaveEvent = (invite) => {
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

    data.items
      .filter(propEq("guestId", mdl.User.objectId))
      .map(set(lensProp("guestId"), null))
      .traverse(updateItemTask(HTTP)(mdl), Task.of)
      .chain(traverse(Task.of, updateItemToGuestTask(HTTP)(mdl)))
      .chain(() => deleteInviteTask(HTTP)(mdl)(invite.objectId))
      .fork(onError, onSuccess)
  }

  const assignNewHost = () => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("assign new host failed", error)
    }

    let hostId = state.modal.newHost()

    console.log(data)
    updateEventTask(HTTP)(mdl)(data.event.eventId)({
      hostId,
    })
      .chain(() =>
        data.guests.traverse(
          (guest) => updateInviteTask(HTTP)(mdl)(guest.objectId)({ hostId }),
          Task.of
        )
      )
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, updateEventView)
  }

  const assignNewHostAndLeaveEvent = () => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("delete event failed", error)
    }

    const onSuccess = () => {
      leaveEvent(find(propEq("guestId", mdl.User.objectId), data.guests))
    }

    let hostId = state.modal.newHost()

    console.log(data)
    //updateEvent, invites,
    updateEventTask(HTTP)(mdl)(data.event.eventId)({
      hostId,
    })
      .chain(() =>
        data.guests.traverse(
          (guest) => updateInviteTask(HTTP)(mdl)(guest.objectId)({ hostId }),
          Task.of
        )
      )
      .fork(onError, onSuccess)
  }

  const otherGuests = (guests) =>
    without(guests.filter(propEq("guestId", mdl.User.objectId)), guests)

  const isHost = (guests) =>
    guests.filter(propEq("hostId", mdl.User.objectId)).any()

  const isLast = (guests) =>
    !otherGuests(guests).filter(propEq("status", 1)).any()

  const invite = (guests) => find(propEq("guestId", mdl.User.objectId), guests)

  const deleteInvite = (mdl) => {
    isLast(data.guests)
      ? state.modal.isShowing("isLast")
      : isHost(data.guests)
      ? state.modal.isShowing("isHost")
      : leaveEvent(invite(data.guests))
  }

  // const updateInvite = (mdl) => (update) => {
  //   const onError = (error) => {
  //     state.error = jsonCopy(error)
  //     state.status = "failed"
  //     console.log("invite update failed", state, update)
  //   }

  //   const onSuccess = (eventData) => {
  //     updateEventView(eventData)
  //   }

  //   updateInviteTask(HTTP)(mdl)(invite.objectId)(update)
  //     .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
  //     .fork(onError, onSuccess)
  // }

  const updateItem = (mdl) => (item) => {
    const onError = (error) => {
      state.items.error(jsonCopy(error))
      state.items.status("failed")
      console.log("update item failed", error)
    }

    const onSuccess = (eventData) => {
      state.items.name = ""
      state.items.quantity = ""
      state.items.updateGuest(false)
      updateEventView(eventData)
      state.items.isSubmitted(false)
    }

    state.items.isSubmitted(true)
    updateItemTask(HTTP)(mdl)(item)
      .chain((item) =>
        state.items.updateGuest()
          ? updateItemToGuestTask(HTTP)(mdl)(item)
          : Task.of(item)
      )
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
      .fork(onError, updateEventView)
  }

  const deleteComment = (mdl) => (commentId) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("delete comment failed", error)
    }

    deleteCommentTask(HTTP)(mdl)(commentId)
      .chain((_) => loadEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, updateEventView)
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
      updateEventView(eventData)
    }

    let item = {
      eventId: mdl.Events.currentEventId(),
      name: state.items.name,
      quantity: parseInt(state.items.quantity),
    }

    state.items.isSubmitted(true)
    validateItemTask(item)(data)
      .chain(addItemToEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
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
      updateEventView(eventData)
    }

    let comment = {
      message: state.comments.message,
      name: mdl.User.name,
      guestId: mdl.User.objectId,
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
      updateEventView(eventData)
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
      // console.log(data.event)
      return m(".event-page", [
        state.status == "loading" && m(".", "Fetching Event..."),
        state.status == "failed" && m(".code", state.error.message),
        state.status == "success" &&
          m(".width-100", [
            m(".event-page-heading width-100", [
              state.modal.isShowing() == "isLast" &&
                m(Modal, { mdl }, [
                  {
                    header:
                      "Your the last to leave! click ok to delete this event",
                    body: m(WarningStandardLine),
                    footer: m(".frow", [
                      m(
                        "button.col-xs-1-2",
                        { onclick: (e) => deleteEvent(data.guests[0]) },
                        "Delete"
                      ),
                      m(
                        "button.col-xs-1-2",
                        { onclick: (e) => state.modal.isShowing(null) },
                        "go back to event"
                      ),
                    ]),
                  },
                ]),
              state.modal.isShowing() == "isHost" &&
                m(Modal, { mdl }, [
                  {
                    header:
                      "Your the Host! to leave this event you need to assign a new host",
                    body: m(
                      "ul",
                      otherGuests(data.guests)
                        .filter(propEq("status", 1))
                        .map(({ name, guestId }) =>
                          m(
                            "span",
                            m("input", {
                              id: guestId,
                              type: "radio",
                              name: "find-host",
                              oninput: (e) => state.modal.newHost(e.target.id),
                            }),
                            name
                          )
                        )
                    ),
                    footer: m(".frow ", [
                      m(
                        "button.col-xs-1-2",
                        {
                          disabled: !state.modal.newHost(),
                          onclick: (e) => assignNewHostAndLeaveEvent(),
                        },
                        "Assign new Host and leave Event"
                      ),
                      m(
                        "button.col-xs-1-2",
                        { onclick: (e) => state.modal.isShowing(null) },
                        "Cancel and return to event"
                      ),
                    ]),
                  },
                ]),

              state.modal.isShowing() == "newHost" &&
                m(Modal, { mdl }, [
                  {
                    header: "Select the new host",
                    body: m(
                      "ul",
                      otherGuests(data.guests)
                        .filter(propEq("status", 1))
                        .map(({ name, guestId }) =>
                          m(
                            "span",
                            m("input", {
                              id: guestId,
                              type: "radio",
                              name: "find-host",
                              oninput: (e) => state.modal.newHost(e.target.id),
                            }),
                            name
                          )
                        )
                    ),
                    footer: m(".frow ", [
                      m(
                        "button.col-xs-1-2",
                        {
                          disabled: !state.modal.newHost(),
                          onclick: (e) => assignNewHost(),
                        },
                        "Assign new Host"
                      ),
                      m(
                        "button.col-xs-1-2",
                        { onclick: (e) => state.modal.isShowing(null) },
                        "Cancel and return to event"
                      ),
                    ]),
                  },
                ]),

              m("h1.event-page-title.text-center", data.event.title),
              m(
                ".frow row width-100",
                m(
                  "h3.event-page-subheading.col-xs-1-2",
                  `${M(data.event.start).format("ddd MM-DD-YYYY")}`
                ),
                m(
                  "h3.event-page-subheading.col-xs-1-2",
                  `${data.event.startTime} - ${data.event.endTime}`
                )
              ),

              m(
                `.navbar-tab-section-${getTheme(mdl)}`,
                m(
                  ".frow row width-100",
                  ["info", "guests", "comments", "items"].map((tab) =>
                    m(
                      `button.navbar-tab-${getTheme(mdl)}.col-xs-1-4`,
                      {
                        class: state[tab].isShowing()
                          ? `navbar-tab-selected`
                          : "",
                        onclick: (e) => showTab(tab),
                      },
                      tab
                    )
                  )
                )
              ),
            ]),
            m(".accordian", [
              m(
                AccordianItem,
                { mdl, state, data, part: "info", title: "Info" },
                [
                  m("label", data.event.notes),
                  m("label", data.event.hostId.name),
                  m("label", data.event.hostId.email),

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
                  m(
                    ".event-forms",
                    m(".frow row event-input-group", [
                      m("input.col-xs-4-5", {
                        placeholder: "email",
                        type: "email",
                        value: state.guests.email,
                        oninput: (e) =>
                          (state.guests.email = e.target.value.trim()),
                      }),

                      m(
                        `button.btn-${getTheme(mdl)}.col-xs-1-5.button-none`,
                        { onclick: (e) => sendInvite(mdl) },
                        "Invite"
                      ),

                      state.guests.error() &&
                        m("code.error-field", state.guests.error()),
                    ])
                  ),

                  m(".frow row-start", [
                    m(".col-xs-1-2", mdl.User.name),
                    m(
                      ".col-xs-1-2",
                      m(InviteRSVP, {
                        mdl,
                        reload: () => mdl.Invites.fetch(true),
                        guest: head(
                          data.guests.filter(
                            propEq("guestId", mdl.User.objectId)
                          )
                        ),
                      })
                    ),
                  ]),
                  data.guests
                    .filter(compose(not, propEq("guestId", mdl.User.objectId)))
                    .map((guest) =>
                      m(".frow row-start", [
                        m(".col-xs-1-2", guest.name),
                        m(
                          ".col-xs-1-2",
                          m(InviteRSVP, {
                            mdl,
                            guest,
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
                      `button.btn-${getTheme(mdl)}.col-xs-1-5.button-none`,
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
                            item.guestId
                              ? [
                                  m(
                                    "span.clickable.frow row-start",
                                    isUserItem(mdl)(item) &&
                                      m(MinusCircleLine, {
                                        onclick: (e) => {
                                          item.guestId = null
                                          state.items.updateGuest(true)
                                          updateItem(mdl)(item)
                                        },
                                        class: "smaller",
                                      }),
                                    getUserFromId(item.guestId)
                                  ),
                                ]
                              : m(
                                  "i.clickable",
                                  {
                                    onclick: (e) => {
                                      item.guestId = mdl.User.objectId
                                      state.items.updateGuest(true)
                                      updateItem(mdl)(item)
                                    },
                                  },
                                  "click to select item"
                                )
                          )
                        ),
                        m(".col-xs-1-3 frow items-center", [
                          isUserItem(mdl)(item) &&
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
                            isUserItem(mdl)(item) &&
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
                            isUserItem(mdl)(item) &&
                              m(
                                ".col-xs-1-3",
                                m(
                                  "span.clickable.smaller",
                                  m(AngleLine, {
                                    class: "decrement",
                                    onclick: (e) => {
                                      item.quantity > 0 && item.quantity--
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
                      ".events-messages-container width-100 text-center",
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
                                  mdl.User.objectId == comment.guestId
                                    ? "me"
                                    : "other"
                                }`,
                                m(".event-comments-message frow items-end", [
                                  m(".speech-bubble", [
                                    m("span.text-left", comment.message),
                                    mdl.User.objectId == comment.guestId &&
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
                                      m("span", comment.name),
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
                        : m(
                            ".events-messages-container-empty",
                            "Start a conversation"
                          )
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
                            oncreate: autoFocus,
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
                            `button.button-none.comments-message-btn-${getTheme(
                              mdl
                            )}`,
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
                    `button.btn-${getTheme(mdl)}`,
                    { onclick: (e) => deleteInvite(mdl) },
                    data.guests.length == 1 ? "Delete Event" : "Leave Event"
                  ),
                  isHost(data.guests) &&
                    m(
                      `button.btn-${getTheme(mdl)}`,
                      {
                        disabled: isLast(data.guests),
                        onclick: (e) => state.modal.isShowing("newHost"),
                      },
                      "Change Host"
                    ),
                  m(
                    `button.btn-${getTheme(mdl)}`,
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
