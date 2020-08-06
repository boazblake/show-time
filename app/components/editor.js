import { Modal, EventForm } from "Components"
import { HTTP, submitEventTask } from "Http"

export const Editor = ({ attrs: { mdl } }) => {
  const EventFormModel = {
    shortDate: mdl.selectedDate().format("YYYY-MM-DD"),
    allDay: false,
    inPerson: true,
    location: "",
    latlong: "",
    map: "",
    startTime: "",
    endTime: "",
    title: "",
    notes: "",
  }
  const addNewEvent = ({ state, mdl }) => {
    const onError = (err) => {
      state.error = err
      state.status = "failed"
    }

    const onSuccess = () => {
      state.error = null
      state.status = "success"
      mdl.Invites.fetch(true)
      mdl.Day.update(true)
      mdl.State.modal(false)
    }
    submitEventTask(HTTP)(mdl)(state).fork(onError, onSuccess)
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        Modal,
        { mdl },
        {
          header: m("h3", `Add Event`),
          body: m(EventForm, { mdl, data: EventFormModel }),
          footer: m(
            "button",
            { onclick: (e) => addNewEvent({ mdl, state: EventFormModel }) },
            "Submit"
          ),
        }
      ),
  }
}
