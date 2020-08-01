import { Home } from "Pages/home"
import { calendarModel } from "Components/calendar/model"
// import { clockModel } from "Components/clock/model"
import { getHoursInDay, clockModel } from "Utils"

const routes = (mdl) => {
  return {
    "/:date": {
      onmatch: ({ date }) => {
        mdl.currentShortDate(date)
        mdl.currentLongDate(new Date(date))
        mdl.Calendar.data = calendarModel(date)
        mdl.Clock.data = clockModel(mdl, date)
      },
      render: () => m(Home, { mdl, key: new Date() }),
    },
  }
}

export default routes
