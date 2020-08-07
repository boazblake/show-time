import { EventForm } from "./event-form"
import { Modal } from "Components"
import { HTTP, submitEventTask } from "Http"

export const Editor = ({ attrs: { mdl } }) => {
  const EventFormData = {
    shortDate: mdl.selectedDate().format("YYYY-MM-DD"),
    allDay: false,
    inPerson: true,
    location: "",
    latlong: "",
    startTime: "",
    endTime: "",
    title: "",
    notes: "",
  }

  let EventFormState = {
    status: "loading",
    errors: null,
    isSubmitted: false,
    isValid: false,
    queryResults: [],
    querySelected: "",
  }

  const resetState = (state) => {
    state = {
      status: "loading",
      errors: null,
      isSubmitted: false,
      isValid: false,
      queryResults: [],
      querySelected: "",
    }
  }

  const addNewEvent = ({ mdl, state, data }) => {
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
    console.log(state, data)

    submitEventTask(HTTP)(mdl)(data).fork(onError, onSuccess)
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        Modal,
        { mdl },
        {
          header: m("h3", `Add Event`),
          body: m(EventForm, {
            mdl,
            data: EventFormData,
            state: EventFormState,
            resetState,
          }),
          footer: m(
            "button",
            {
              onclick: (e) =>
                addNewEvent({
                  mdl,
                  data: EventFormData,
                  state: EventFormState,
                }),
            },
            "Submit"
          ),
        }
      ),
  }
}
