import { Modal } from "Components"
import { HTTP } from "Utils"

const submitEventTask = (http) => (mdl) => ({
  shortDate,
  timestamp,
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
    endTime: new Date(year, month, day, getHour(endTime), getMin(endTime)),
    startTime: new Date(
      year,
      month,
      day,
      getHour(startTime),
      getMin(startTime)
    ),
    shortDate,
    notes,
    title,
    allday,
  }

  console.log(dto)

  return http.backEnd.postTask(mdl)(url)(dto)
}

const EventForm = ({ attrs: { state } }) => {
  //will need to be done on fetch??
  // let startSplit = state.startTime.split(":")

  // mdl.Day.data[`${startSplit[0]}:00`][startSplit[1]] = state
  // localStorage.setItem(state.date, JSON.stringify(mdl.Day.data))
  // mdl.state.modal(false)
  // m.redraw()

  return {
    view: () =>
      m("form.event-form", [
        m(
          "label",
          m("input", {
            onchange: (e) => m.route.set(e.target.value),
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
    timestamp: mdl.currentLongDate().valueOf,
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
      m.redraw()
    }

    const onSuccess = (mdl, state) => (data) => {
      state.data = data
      if (data) {
        mdl.Day.data = data
      }
      state.error = null
      state.status = "success"
      m.redraw()
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
