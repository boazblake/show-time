import { Home } from "Pages/home"
import { calendarModel } from "Components/calendar/model"
import { dayModel } from "Utils"
import { addMonths } from "date-fns"

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
        // console.log(mdl.Clock.data)
      },
      render: () => [m(Home, { mdl, key: mdl.currentLongDate() })],
    },
  }
}

export default routes
