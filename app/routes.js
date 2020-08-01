import { Home, Event } from "Pages"
import { calendarModel } from "Components/calendar/model"
import { dayModel } from "Utils"

const routes = (mdl) => {
  return {
    "/:date": {
      onmatch: ({ date }) => {
        let _d = date.split("-")
        mdl.currentShortDate(date)
        mdl.currentLongDate(new Date(date))
        mdl.selectedDate = { year: _d[0], month: _d[1], day: _d[2] }
        mdl.Calendar.data = calendarModel(date)
        mdl.Day.data = dayModel(mdl, date)
      },
      render: () => [m(Home, { mdl, key: mdl.currentLongDate() })],
    },

    "/:date/:hour/:min": {
      onmatch: ({ hour, min }) => {
        mdl.Event = mdl.Day.data[`${hour}:00`][min]
      },
      render: () => [m(Event, { mdl, key: mdl.currentLongDate() })],
    },
  }
}

export default routes
