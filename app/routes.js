import { Home, Event, Login, Register } from "Pages"
import { calendarModel } from "Components/calendar/model"
import { dayModel } from "Components"

const routes = (mdl) => {
  return {
    "/login": {
      render: () => m(Login, { mdl }),
    },
    "/register": {
      render: () => m(Register, { mdl }),
    },
    "/:username/:date": {
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

    "/:username/:date/:hour/:min": {
      onmatch: ({ hour, min }) => {
        mdl.Event = mdl.Day.data[`${hour}:00`][min]
      },
      render: () => [m(Event, { mdl, key: mdl.currentLongDate() })],
    },
  }
}

export default routes
