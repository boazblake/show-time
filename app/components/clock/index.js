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
    view: ({ attrs: { mdl, events, hour, time } }) => {
      let titles = Object.values(events).map((e) => e.title)
      // console.log("HOUR", time, hour, hour[time], titles)
      return m(
        ".frow ",
        m(".hour ", [
          time,
          m(".half-hour", [m(".top", titles)]),
          m(".half-hour", m(".bottom")),
        ])
      )
    },
  }
}

export const Clock = () => {
  return {
    view: ({ attrs: { mdl, events } }) => {
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
            Object.values(mdl.Clock.data).map((hour, idx) => {
              console.log()
              return m(Hour, {
                mdl,
                hour,
                time: Object.keys(hour)[0],
                events,
              })
            }),
          ]),
        ])
      )
    },
  }
}
