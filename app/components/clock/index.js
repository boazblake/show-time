import eachHourOfInterval from "date-fns/fp/eachHourOfInterval"
import add from "date-fns/fp/add"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import { formatDateString, shortDate } from "Utils"
import { Editor } from "Components"

// const getHours = (dateFormat, selectedDate) => {
//   console.log(parseISO(formatDateString(selectedDate)))
//   let interval = {
//     start: selectedDate,
//     end: add({ days: 1 })(selectedDate),
//   }
//   return eachHourOfInterval(interval).map((hour) => format(hour, dateFormat))
// }

const toHourViewModel = (date) => (mdl, hour) => {
  if (!mdl[date][hour]) {
    mdl[date][hour] = {}
  }
  return mdl
}

export const DailyPlanner = (mdl, selectedDate) => {
  let hours = getHours(mdl.format, selectedDate)
  let today = mdl.data[shortDate(selectedDate)] || {
    [shortDate(selectedDate)]: {},
  }
  return hours.reduce(toHourViewModel(shortDate(selectedDate)), today)
}

const Hour = () => {
  return {
    view: ({ attrs: { mdl, hour, time, events } }) => {
      // console.log(events)
      return m(
        ".frow ",
        m(".hour ", [
          time,
          m(".half-hour", [
            m(
              ".top",
              m(
                "ul",
                events.map((e) => m("li", e.title))
              )
            ),
          ]),
          m(".half-hour", m(".bottom")),
        ])
      )
    },
  }
}

export const Clock = ({ attrs: { mdl } }) => {
  const loadTask = (http) => (mdl) => locals.getTask(mdl.currentShortDate())

  const onError = (state) => (err) => {
    state.error = err
    state.status = "failed"
    // console.log("e", state)
    m.redraw()
  }

  const onSuccess = (mdl, state) => (data) => {
    state.data = data
    if (data) {
      mdl.Clock.data = data
    }
    state.error = null
    state.status = "success"
    // console.log("s", state)
    m.redraw()
  }

  const load = (state) => ({ attrs: { mdl } }) => {
    loadTask(HTTP)(mdl).fork(onError(state), onSuccess(mdl, state))
  }
  console.log("clocl", mdl.Clock.data)
  return {
    oninit: load,
    view: ({ attrs: { mdl } }) => {
      return m(
        ".clock",
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
          m(".clock-face", [
            mdl.state.modal() && m(Editor, { mdl }),
            Object.keys(mdl.Clock.data).map((hour, idx) => {
              // console.log(mdl.Clock.data[hour])
              return m(Hour, {
                mdl,
                hour: mdl.Clock.data[hour],
                time: hour,
                events: Object.values(mdl.Clock.data[hour]),
              })
            }),
          ]),
        ])
      )
    },
  }
}
