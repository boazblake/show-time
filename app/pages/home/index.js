import { Calendar, Clock } from "Components"
import { HTTP, locals } from "Utils"

const loadTask = (http) => (mdl) => locals.getTask(mdl.currentDate)

const onError = (state) => (err) => {
  state.error = err
  state.status = "failed"
  // console.log("e", state)
  m.redraw()
}

const onSuccess = (state) => (data) => {
  state.data = data
  state.error = null
  state.status = "success"
  // console.log("s", state)
  m.redraw()
}

const load = (state) => ({ attrs: { mdl } }) =>
  loadTask(HTTP)(mdl).fork(onError(state), onSuccess(state))

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
        state.status == "success" && m(Clock, { mdl, events: state.data }),
      ])
    },
  }
}
