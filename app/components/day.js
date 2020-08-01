import { Hour, Editor } from "Components"

export const Day = ({ attrs: { mdl } }) => {
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

  const load = (state) => ({ attrs: { mdl } }) => {
    loadTask(HTTP)(mdl).fork(onError(state), onSuccess(mdl, state))
  }
  console.log("clocl", mdl.Day.data)
  return {
    oninit: load,
    view: ({ attrs: { mdl } }) => {
      return m(
        ".day",
        m(".frow-container", [
          m(
            `.${mdl.state.modal() ? "bg-warn" : "bg-info"}`,
            m(
              "button.frow.width-100",
              {
                onclick: (e) => mdl.state.modal(!mdl.state.modal()),
              },
              mdl.state.modal() ? "Cancel" : "Add Event"
            )
          ),
          m(".day-container", [
            mdl.state.modal() && m(Editor, { mdl }),
            Object.keys(mdl.Day.data).map((hour, idx) => {
              return m(Hour, {
                mdl,
                hour: mdl.Day.data[hour],
                time: hour,
                events: Object.values(mdl.Day.data[hour]),
              })
            }),
          ]),
        ])
      )
    },
  }
}
