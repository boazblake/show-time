import { log, jsonCopy, shortDateString } from "Utils"
import { inviteOptions } from "Models"
import { HTTP, getEventTask, deleteEventTask, updateEventTask } from "Http"

export const Event = ({ attrs: { mdl } }) => {
  const state = {
    error: {},
    eventId: mdl.Events.currentEventId(),
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

    getEventTask(HTTP)(mdl)(state).fork(onError, onSuccess)
  }

  const deleteEvent = (mdl) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = (event) => {
      console.log("deleted")
      m.route.set(
        `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
      )
      state.event = event
      state.error = {}
      state.status = "success"
    }

    deleteEventTask(HTTP)(mdl)(state).fork(onError, onSuccess)
  }

  const updateEvent = (mdl) => (status) => {
    const onError = (err) => {
      state.error = jsonCopy(err)
      console.log("state.e", state.error)
      state.status = "failed"
    }

    const onSuccess = (event) => {
      console.log("udpated", event)

      state.event = toEventviewModel(event)
      state.error = {}
      state.status = "success"
    }

    updateEventTask(HTTP)(mdl)(status).fork(onError, onSuccess)
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
                  mdl.State.toAnchor(state.event.startTime)
                  m.route.set(
                    `/${mdl.User.name}/${mdl
                      .selectedDate()
                      .format("YYYY-MM-DD")}`
                  )
                },
              },
              "Back"
            ),
            m("h1", state.event.title),
            m("label", "date: ", state.event.date),
            m("label", "begins: ", state.event.startTime),
            m("label", "ends: ", state.event.endTime),
            m("label", "notes: ", state.event.notes),
            m(
              "label",
              m(
                "select",
                {
                  onchange: (e) => {
                    state.event.status = e.target.key
                    updateEvent(mdl)({ status: state.event.status })
                  },
                  value: inviteOptions[state.event.status],
                },
                inviteOptions.map((opt, idx) =>
                  m("option", { value: opt, key: idx }, opt.toUpperCase())
                )
              ),
              "Status: "
            ),

            m("button", { onclick: (e) => deleteEvent(mdl) }, "delete"),
          ]),
      ])
    },
  }
}
