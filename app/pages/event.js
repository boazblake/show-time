import { log, jsonCopy, shortDateString, HTTP } from "Utils"
import moment from "moment"

const toEventviewModel = ({ startTime, endTime, title, notes }) => ({
  date: moment.utc(startTime).format("DD-MM-YYYY"),
  title: title.toUpperCase(),
  begin: moment.utc(startTime).format("HH:MM"),
  end: moment.utc(endTime).format("HH:MM"),
  notes,
})

const loadTask = (http) => (mdl) => (state) =>
  http.backEnd
    .getTask(mdl)(`data/Events/${state.eventId}`)
    .map(toEventviewModel)

const deleteEventTask = (http) => (mdl) => (state) =>
  http.backEnd.deleteTask(mdl)(`data/Events/${state.eventId}`).map(log("wtf"))

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    eventId: mdl.currentEventId(),
    status: "loading",
  }

  const load = ({ attrs: { mdl } }) => {
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

    loadTask(HTTP)(mdl)(state).fork(onError, onSuccess)
  }

  const deleteEvent = (mdl) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = (event) => {
      console.log("deleted")
      m.route.set(`/${mdl.user.name}/${shortDateString(mdl.selectedDate)}`)
      state.event = event
      state.error = {}
      state.status = "success"
    }

    deleteEventTask(HTTP)(mdl)(state).fork(onError, onSuccess)
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
                  m.route.set(
                    `/${mdl.user.name}/${shortDateString(mdl.selectedDate)}`
                  )
                },
              },
              "Back"
            ),
            m("h1", state.event.title),
            m("label", "date: ", state.event.date),
            m("label", "begins: ", state.event.begin),
            m("label", "ends: ", state.event.end),
            m("label", "notes: ", state.event.notes),
            m("button", { onclick: (e) => deleteEvent(mdl) }, "delete"),
          ]),
      ])
    },
  }
}
