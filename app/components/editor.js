import { Modal } from "Components"
import { HTTP, submitEventTask } from "Http"

const EventForm = ({ attrs: { state, mdl } }) => {
  return {
    view: () =>
      m("form.event-form", [
        m(
          "label",
          m("input", {
            onchange: (e) => {
              // console.log("input", `/${mdl.User.name}/${e.target.value}`)
              m.route.set(`/${mdl.User.name}/${e.target.value}`)
            },
            type: "date",
            value: mdl.selectedDate().format("YYYY-MM-DD"),
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
  // console.log(mdl)
  const state = {
    shortDate: mdl.selectedDate().format("YYYY-MM-DD"),
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
      mdl.Invites.fetch(true)
      mdl.Day.update(true)
      mdl.State.modal(false)
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
