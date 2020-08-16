import { EventForm } from "./event-form"
import { HTTP, submitEventTask } from "Http"
import { validateTask } from "./validations"
import { Animate, slideInDown, slideOutUp } from "Styles"

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
    locationWarning: Stream(null),
  }

  const resetState = (state) => {
    EventFormState = {
      status: "loading",
      errors: null,
      isSubmitted: false,
      isValid: false,
      queryResults: [],
      querySelected: "",
      locationWarning: Stream(null),
    }
  }

  const validate = (state, data) => {
    const onError = (errors) => {
      state.errors = errors
      state.isValid = false
      // console.log("v err", state, errors)
    }

    const onSuccess = (data) => {
      // console.log("v succ", data)
      state.errors = null
      state.isValid = true
    }

    validateTask(data).fork(onError, onSuccess)
  }

  const addNewEvent = ({ mdl, data, state }) => {
    const onError = (errors) => {
      state.errors = errors
      state.status = "failed"
    }

    const onSuccess = () => {
      mdl.Invites.fetch(true)
      mdl.Events.createNewEvent(false)
    }

    state.isSubmitted = true
    validateTask(data)
      .chain(submitEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(EventForm, {
        oncreate: Animate(slideInDown, 2),
        onbeforeremove: Animate(slideOutUp, 2),
        mdl,
        data: EventFormData,
        state: EventFormState,
        validate,
        resetState,
        submit: addNewEvent,
      }),
  }
}
