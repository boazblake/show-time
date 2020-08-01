import { Modal } from "Components"
import { jsonCopy, formatDateString } from "Utils"

const addNewEvent = (state, mdl) => {
  let startSplit = state.startTime.split(":")

  mdl.Day.data[`${startSplit[0]}:00`][startSplit[1]] = state
  localStorage.setItem(state.date, JSON.stringify(mdl.Day.data))
  mdl.state.modal(false)
  m.redraw()
}

const EventForm = ({ attrs: { state } }) => {
  return {
    view: () =>
      m("form.event-form", [
        m(
          "label",
          m("input", {
            onchange: (e) => m.route.set(e.target.value),
            type: "date",
            value: state.date,
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
  console.log("editor:: find event?", mdl)
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
