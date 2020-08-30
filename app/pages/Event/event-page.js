import { jsonCopy, hyphenize, getTheme } from "Utils"
import { without, propEq, set, lensProp, traverse, find, pluck } from "ramda"
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"
import {
  HTTP,
  loadEventTask,
  deleteInviteTask,
  updateEventHostTask,
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
import { Modal, Editor } from "Components"
import { WarningStandardLine } from "@mithril-icons/clarity/cjs"
import Task from "data.task"
import { validateItemTask, validateCommentTask } from "./validations"
import { EventComments, EventItems, EventGuests, EventInfo } from "./components"

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
    tab == "info" && mdl.Events.fetch(true)
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

  const updateEventView = ({ event, guests, items, comments }) => {
    data.event = event
    data.guests = guests
    data.comments = comments
    data.items = items
    state.error = {}
    state.status = "success"
    state.modal.isShowing(null)
    state.modal.newHost(null)

    guests
      .filter(propEq("guestId", mdl.User.objectId))
      .map(({ updated, status }) => mdl.Events.isMember(updated || status == 1))
  }

  const load = ({ attrs: { mdl } }) => {
    mdl.Events.fetch(false)
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

    updateEventHostTask(HTTP)(mdl)(data.event.eventId)(hostId)
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

    updateEventHostTask(HTTP)(mdl)(data.event.eventId)(hostId)
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
    comment.message &&
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
    onupdate: ({ attrs: { mdl } }) =>
      mdl.Events.fetch() && load({ attrs: { mdl } }),
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
                    header: m(
                      "h2.frow.text-center",
                      "Your The Last to Leave! Click Delete if you are sure you want to Delete this Event!"
                    ),
                    body: m(WarningStandardLine),
                    footer: m(".frow", [
                      m(
                        "button.col-xs-1-2.required-field",
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
                    header: m(
                      "h2.frow.text-center",
                      "Your the Host! to leave this event you need to assign a new host"
                    ),
                    body: m(
                      "ul.frow direction-column",
                      otherGuests(data.guests)
                        .filter(propEq("status", 1))
                        .map(({ name, guestId }) =>
                          m(
                            ".frow row justify-start",
                            m(".col-xs-1-2", name),
                            m(
                              "span.col-xs-1-2",
                              m("input", {
                                id: guestId,
                                type: "radio",
                                name: "find-host",
                                oninput: (e) =>
                                  state.modal.newHost(e.target.id),
                              })
                            )
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
                    header: m("h2.frow.text-center", "Select the new host"),
                    body: m(
                      "ul.frow direction-column",
                      otherGuests(data.guests)
                        .filter(propEq("status", 1))
                        .map(({ name, guestId }) =>
                          m(
                            ".frow row justify-start mb-10",
                            m(".col-xs-1-2", name),
                            m(
                              "span.col-xs-1-2",
                              m("input", {
                                id: guestId,
                                type: "radio",
                                name: "find-host",
                                oninput: (e) =>
                                  state.modal.newHost(e.target.id),
                              })
                            )
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

              state.modal.isShowing() == "settings" &&
                m(Modal, { mdl }, [
                  {
                    header: m("h2.frow.text-center", "Event Settings"),
                    body: m(".frow row-start", [
                      m(
                        `button.btn-${getTheme(mdl)}`,
                        { onclick: (e) => deleteInvite(mdl) },
                        data.guests.length == 1 ? "Delete Event" : "Leave Event"
                      ),
                      isHost(data.guests) && [
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
                          {
                            onclick: (e) => {
                              mdl.Events.updateEvent(true)
                              state.modal.isShowing("editEvent")
                            },
                          },
                          "Edit"
                        ),
                      ],
                    ]),
                    footer: [
                      m(
                        `button.btn-${getTheme(mdl)}`,
                        {
                          onclick: (e) => {
                            state.modal.isShowing(null)
                          },
                        },
                        "Back To Event"
                      ),
                    ],
                  },
                ]),

              state.modal.isShowing() == "editEvent" &&
                mdl.Events.updateEvent() &&
                m(Modal, { mdl }, [
                  {
                    header: m("h2.frow.text-center", "Edit Event"),
                    body: m(Editor, {
                      mdl,
                      id: data.event.eventId,
                      event: data.event,
                      invites: data.guests,
                    }),
                    footer: [
                      m(
                        `button.btn-${getTheme(mdl)}`,
                        {
                          onclick: (e) => {
                            state.modal.isShowing("settings")
                            mdl.Events.updateEvent(false)
                          },
                        },
                        "Back To Settings"
                      ),
                      m(
                        `button.btn-${getTheme(mdl)}`,
                        {
                          onclick: (e) => {
                            mdl.Events.updateEvent(false)
                            state.modal.isShowing(null)
                          },
                        },
                        "Back To Event"
                      ),
                    ],
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
                `nav.navbar-tab-section-${getTheme(mdl)}`,
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

            m("section.event-view-section", [
              state.info.isShowing() &&
                m(EventInfo, {
                  mdl,
                  data,
                  isMember: mdl.Events.isMember(),
                  state,
                  setupMap,
                  otherGuests,
                }),

              state.guests.isShowing() &&
                m(EventGuests, {
                  mdl,
                  data,
                  state,
                  sendInvite,
                  isMember: mdl.Events.isMember(),
                }),

              state.items.isShowing() &&
                m(EventItems, {
                  mdl,
                  data,
                  isMember: mdl.Events.isMember(),
                  state,
                  validate,
                  addItem,
                  updateItem,
                  deleteItem,
                }),

              state.comments.isShowing() &&
                m(EventComments, {
                  mdl,
                  data,
                  isMember: mdl.Events.isMember(),
                  state,
                  validate,
                  sendMessage,
                  deleteComment,
                }),
            ]),
          ]),
      ])
    },
  }
}
