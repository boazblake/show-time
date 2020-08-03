import { jsonCopy, log, HTTP } from "Utils"
import { fromFullDate } from "../Utils"

const deleteEvent = (mdl) => {
  let { date, hour, min } = m.route.param()
  delete mdl.Day.data[`${hour}:00`][min]
  localStorage.setItem(date, JSON.stringify(mdl.Day.data))
}

const toEventviewModel = (event) => {
  console.log("event", event)
  console.log("start date", event.startTime, fromFullDate(event.startTime))

  return event
}

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    eventId: mdl.currentEventId(),
    status: "loading",
  }

  const loadTask = (http) => (mdl) =>
    http.backEnd
      .getTask(mdl)(`data/Events/${state.eventId}`)
      .map(toEventviewModel)
      .map(log("wtf"))

  const onError = (err) => {
    state.error = jsonCopy(err)
    console.log("state.e", state.error)
    state.status = "failed"
  }

  const onSuccess = (event) => {
    state.event = event
    state.error = {}
    state.status = "success"
  }

  const load = ({ attrs: { mdl } }) => {
    loadTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    view: () => {
      return m(".event", [
        state.status == "loading" && m(".", "Fetching Event..."),
        state.status == "failed" && m(".code", state.error.message),
        state.status == "success" &&
          m(".event-container", [
            m(
              "button",
              {
                onclick: (e) => {
                  mdl.toAnchor(state.event.startTime)
                  gotoroute(mdl)
                },
              },
              "Back"
            ),
            m("h1", state.event.title),
            m("label", "date: ", state.event.date),
            m("label", "begins: ", state.event.startTime),
            m("label", "ends: ", state.event.endTime),
            m("label", "notes: ", state.event.notes),
            m("button", { onclick: (e) => deleteEvent(mdl) }, "delete"),
          ]),
      ])
    },
  }
}
