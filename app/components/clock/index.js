import eachHourOfInterval from "date-fns/fp/eachHourOfInterval"
import add from "date-fns/fp/add"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import { formatDateString } from "Utils"

const getHours = (dateFormat, { year, month, day }) => {
  let date = parseISO(formatDateString(year, month, day))
  let interval = {
    start: date,
    end: add({ days: 1 })(date),
  }
  return eachHourOfInterval(interval).map((hour) => format(hour, dateFormat))
}

const toHourViewModel = (mdl) => (today, hour) => {
  //assign events to hour
  console.log(mdl)
  today[hour] = {}
  return today
}

const DailyPlanner = (mdl, { year, month, day }) => {
  let hours = getHours(mdl.format, { year, month, day })
  let today = (mdl.data[formatDateString(year, month, day)] = {})
  let plannerViewModel = hours.reduce(toHourViewModel(mdl), today)
  return { hours, plannerViewModel }
}

const Hour = () => {
  return {
    view: ({ attrs: { hour } }) =>
      m(
        ".frow ",
        m(".hour ", [
          m(".half-hour", [m(".top", hour)]),
          m(".half-hour", m(".bottom")),
        ])
      ),
  }
}

export const Clock = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      let date = mdl.CalendarDto.data.selected
      let now = ""
      return m(
        ".clock",
        m(".frow-container", [
          m("button.width-100", "Add Event"),
          m(
            ".clock-face",
            DailyPlanner(mdl.ClockDto, date).hours.map((hour) =>
              m(Hour, { hour })
            )
          ),
        ])
      )
    },
  }
}
