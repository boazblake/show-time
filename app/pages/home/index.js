import { Calendar, Day } from "Components"
import { HTTP, locals } from "Utils"

const loadTask = (http) => (mdl) => locals.getTask(mdl.currentShortDate())

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

const load = (state) => ({ attrs: { mdl } }) =>
  loadTask(HTTP)(mdl).fork(onError(state), onSuccess(mdl, state))

export const Home = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    status: "loading",
  }

  return {
    oninit: load(state),
    view: ({ attrs: { mdl } }) => {
      return m(".frow", [
        m(Calendar, { mdl }),
        state.status == "loading" && m("p", "FETCHING TODAYS EVENTS..."),
        state.status == "failed" && m("p", "FAILED TO FETCH EVENTS"),
        state.status == "success" && m(Day, { mdl, events: state.data }),
      ])
    },
  }
}
