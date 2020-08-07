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

  const validate = (data) => {
    const onError = (errors) => {
      console.log("v err", errors)
      EventFormState.errors = errors
      EventFormState.isValid = false
    }

    const onSuccess = (data) => {
      console.log("v succ", data)
      EventFormState.errors = null
      EventFormState.isValid = true
    }

    validateTask(data).fork(onError, onSuccess)
  }

  const addNewEvent = ({ mdl, data }) => {
    const onError = (err) => {
      EventFormState.error = err
      EventFormState.status = "failed"
    }

    const onSuccess = () => {
      mdl.Invites.fetch(true)
      mdl.State.modal(false)
    }

    EventFormState.isSubmitted = true
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
          header: m("h1.frow text-centered", `Add Event`),
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
                }),
            },
            "Submit"
          ),
        }
      ),
  }
}
