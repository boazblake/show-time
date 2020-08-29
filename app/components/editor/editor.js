import { EventForm } from "./event-form"
import { HTTP, createEventTask, updateEventTask } from "Http"
import { validateTask } from "./validations"
import { Animate, slideInDown, slideOutUp } from "Styles"

export const Editor = ({ attrs: { mdl, event } }) => {
  const getData = (id) => {
    let res = id
      ? {
          shortDate: M(event.start).format("YYYY-MM-DD"),
          allDay: event.allDay,
          inPerson: event.inPerson,
          location: event.location,
          latlong: event.latlong,
          startTime: M(event.start).format("HH:mm"),
          endTime: M(event.end).format("HH:mm"),
          title: event.title,
          notes: event.notes,
        }
      : {
          shortDate: M(mdl.selectedDate()).format("YYYY-MM-DD"),
          allDay: false,
          inPerson: true,
          location: "",
          latlong: "",
          startTime: "",
          endTime: "",
          title: "",
          notes: "",
        }

    return res
  }

  let state = {
    status: "loading",
    errors: null,
    isSubmitted: false,
    isValid: false,
    queryResults: [],
    querySelected: "",
    locationWarning: Stream(null),
  }

  const resetState = (state) => {
    state = {
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
      .chain(createEventTask(HTTP)(mdl))
      .fork(onError, onSuccess)
  }

  const updateEvent = ({ mdl, data, state }) => {
    const onError = (errors) => {
      state.errors = errors
      state.status = "failed"
    }

    const onSuccess = () => {
      mdl.Invites.fetch(true)
      mdl.Events.fetch(true)
      mdl.Events.createNewEvent(false)
      mdl.Events.updateEvent(false)
    }

    state.isSubmitted = true

    validateTask(data)
      .chain(updateEventTask(HTTP)(mdl)(mdl.Events.currentEventId()))
      .fork(onError, onSuccess)
  }

  return {
    view: ({ attrs: { mdl, id } }) =>
      m(EventForm, {
        oncreate: Animate(slideInDown, { delay: 2 }),
        onbeforeremove: Animate(slideOutUp, { delay: 2 }),
        mdl,
        data: getData(id),
        state,
        validate,
        resetState,
        submit: addNewEvent,
        update: updateEvent,
        isEdit: id,
      }),
  }
}
