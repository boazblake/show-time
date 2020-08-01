import { Home } from "Pages/home"
import { calendarModel } from "Components/calendar/model"
import { clockModel } from "Utils"

const routes = (mdl) => {
  return {
    "/:date": {
      onmatch: ({ date }) => {
        mdl.currentShortDate(date)
        mdl.currentLongDate(new Date(date))
        mdl.Calendar.data = calendarModel(date)
        mdl.Clock.data = clockModel(mdl, date)
        // console.log(mdl.Clock.data)
      },
      render: () => [m(Home, { mdl, key: mdl.currentLongDate() })],
    },
  }
}

export default routes
