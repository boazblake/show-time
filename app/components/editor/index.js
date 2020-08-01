import { Modal } from "Components"
import { jsonCopy, formatDateString } from "Utils"
import { Calendar } from "../calendar"

const addNewEvent = (state, mdl) => {
  const splitTime = (time) => time.split(":")
  let startSplit = splitTime(state.startTime)
  let endSplit = splitTime(state.endTime)
  let StartTimeHour = startSplit[0]
  let StartTimeMin = startSplit[1]
  let EndTimeHour = endSplit[0]
  let EndTimeMin = endSplit[1]

  console.log("what am i", mdl.Clock.data[state.date], [state.date])
  mdl.Clock.data[state.date][`${StartTimeHour}:00`][StartTimeMin] = state
  mdl.state.modal = false
}

const EventForm = ({ attrs: { state } }) => {
  return {
    view: () =>
      m("form.event-form", [
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
  const state = {
    date: jsonCopy(formatDateString(mdl.Calendar.data.selected)),
    allday: false,
    startTime: "",
    endTime: "",
    title: "",
    notes: "",
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        Modal,
        { mdl },
        {
          header: m("h3", `Add Event On ${state.date}`),
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
