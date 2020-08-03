import { Modal } from "Components"
import { HTTP } from "Utils"
import Task from "data.task"

const submitEventTask = (http) => (mdl) => ({
  shortDate,
  allday,
  startTime,
  endTime,
  title,
  notes,
}) => {
  let getHour = (time) => time.split(":")[0]
  let getMin = (time) => time.split(":")[1]
  let { year, month, day } = mdl.selectedDate

  let url = "data/Events"
  let dto = {
    endTime: new Date(year, month - 1, day, getHour(endTime), getMin(endTime)),
    startTime: new Date(
      year,
      month - 1,
      day,
      getHour(startTime),
      getMin(startTime)
    ),
    shortDate,
    notes,
    title,
    allday,
    createdBy: mdl.user.objectId,
  }

  return http.backEnd
    .postTask(mdl)(url)(dto)
    .chain(({ objectId, ownerId, endTime, startTime, allDay, title }) => {
      let eventId = objectId
      return http.backEnd
        .postTask(mdl)("data/Invites")({
          eventId,
          userId: ownerId,
          status: "accept",
          endTime,
          startTime,
          allDay,
          title,
        })
        .chain(({ objectId }) => {
          let inviteId = objectId
          return Task.of((user) => (event) => ({
            user,
            event,
          }))
            .ap(
              http.backEnd.postTask(mdl)(
                `data/Users/${mdl.user.objectId}/invites%3AInvites%3An`
              )([inviteId])
            )
            .ap(
              http.backEnd.postTask(mdl)(
                `data/Events/${eventId}/invites%3AInvites%3An`
              )([inviteId])
            )
        })
    })
}

;`data/<table-name>/<parentObjectId>/<relationName>`

const EventForm = ({ attrs: { state, mdl } }) => {
  return {
    view: () =>
      m("form.event-form", [
        m(
          "label",
          m("input", {
            onchange: (e) =>
              m.route.set(`/${mdl.user.name}/${shortDate(new Date())}`),
            type: "date",
            value: state.shortDate,
            disabled: state.allday,
          })
        ),
        m(".frow row", [
          [
            m(
              "label.col-xs-1-3",
              m("input", {
                oninput: (e) => (state.startTime = e.target.value),
                value: state.startTime,
                type: "time",
                disabled: state.allday,
              }),
              "Start Time"
            ),
            m(
              "label.col-xs-1-3",
              m("input", {
                oninput: (e) => (state.endTime = e.target.value),
                value: state.endTime,
                type: "time",
                disabled: state.allday,
              }),
              "End Time"
            ),
          ],
          m(
            "label.col-xs-1-3.pt-15 pl-60",
            m("input", {
              type: "checkbox",
              checked: state.allday,
              onclick: (e) => (state.allday = !state.allday),
            }),
            "All Day"
          ),
        ]),

        m(
          "label",
          m("input", {
            type: "text",
            value: state.text,
            oninput: (e) => (state.title = e.target.value),
          }),
          "Title"
        ),
        m(
          "label",
          m("input", {
            type: "text",
            value: state.notes,
            oninput: (e) => (state.notes = e.target.value),
          }),
          "Notes"
        ),
      ]),
  }
}

export const Editor = ({ attrs: { mdl } }) => {
  // console.log("editor:: find event?", mdl)
  const state = {
    shortDate: mdl.currentShortDate(),
    allday: false,
    startTime: "",
    endTime: "",
    title: "",
    notes: "",
  }

  const addNewEvent = (state, mdl) => {
    const onError = (state) => (err) => {
      state.error = err
      state.status = "failed"
    }

    const onSuccess = (mdl, state) => (data) => {
      state.error = null
      state.status = "success"
      mdl.updateDay(true)
      mdl.state.modal(false)
    }

    submitEventTask(HTTP)(mdl)(state).fork(
      onError(state),
      onSuccess(mdl, state)
    )
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        Modal,
        { mdl },
        {
          header: m("h3", `Add Event`),
          body: m(EventForm, { mdl, state }),
          footer: m(
            "button",
            { onclick: (e) => addNewEvent(state, mdl) },
            "Submit"
          ),
        }
      ),
  }
}
