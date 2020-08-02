import { Hour, Editor } from "Components"
import { getHoursInDay } from "Utils"

export const dayModel = (mdl, date = new Date()) =>
  getHoursInDay(mdl.timeFormats[mdl.format()]).reduce((day, hour) => {
    day[hour] = {}
    return day
  }, {})

export const Day = ({ attrs: { mdl } }) => {
  let _dom
  const loadTask = (http) => (mdl) => locals.getTask(mdl.currentShortDate()) //timetsamp to day model ...

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

  const planDay = (mdl) => ({ dom }) => {
    if (mdl.toAnchor()) {
      console.log(
        "anchor",
        mdl.toAnchor(),
        dom,
        dom.querySelector(`${mdl.toAnchor().toString()}`)
      )

      let el = document.getElementById(mdl.toAnchor())

      console.log("el", el)
    }
  }

  return {
    oninit: load,
    oncreate: planDay(mdl),
    view: ({ attrs: { mdl } }) => {
      console.log(_dom)
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
