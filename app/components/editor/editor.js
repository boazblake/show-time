import { EventForm } from "./event-form"
import { Modal } from "Components"
import { HTTP, submitEventTask } from "Http"
import { validateTask } from "./validations"

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

  const resetState = () => {
    EventFormState = {
      status: "loading",
      errors: null,
      isSubmitted: false,
      isValid: false,
      queryResults: [],
      querySelected: "",
    }
  }

  const validate = (state) => (data) => {
    const onError = (errors) => {
      state.errors = errors
      state.isValid = false
    }

    const onSuccess = () => {
      state.errors = null
      state.isValid = true
    }

    validateTask(data).fork(onError, onSuccess)
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

    state.isSubmitted = true
    validateTask(data)
      .chain(submitEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
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
            validate,
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
