import {
  eachDayOfInterval,
  endOfISOWeek,
  startOfISOWeek,
  eachWeekOfInterval,
  parseISO,
} from "date-fns"
import { datesAreSame } from "Utils"

export const isCalenderDay = (invites, day) => ({
  day: day,
  dir: 0,
  invites,
})

export const isNotCalenderDay = (invites, day, date) => ({
  day: day,
  dir: day.isBefore(date) ? -1 : day.isAfter(date) ? 1 : 0,
  invites,
})

const filterBy = (day) => (invites) =>
  invites.filter((i) => datesAreSame(i.start)(day)("YYYY-MM-DD"))

export const createCalendarDayViewModel = (
  invites,
  day,
  date,
  { isSameMonth }
) => {
  return isSameMonth
    ? isCalenderDay(filterBy(day)(invites), M(day))
    : isNotCalenderDay(filterBy(day)(invites), M(day), date)
}

export const createCalendar = (invites, date) => {
  let start = parseISO(date.clone().startOf("month").toISOString())
  let end = parseISO(date.clone().endOf("month").toISOString())

  const matrix = eachWeekOfInterval(
    {
      start,
      end,
    },
    { weekStartsOn: 1 }
  )

  return matrix.map((weekDay) =>
    eachDayOfInterval({
      start: startOfISOWeek(weekDay),
      end: endOfISOWeek(weekDay),
    }).map((day) =>
      createCalendarDayViewModel(invites, day, date, {
        isSameMonth: date.isSame(day, "month"),
      })
    )
  )
}

export const calendarModel = ({ mdl, invites, date }) => {
  let today = M()
  let _date = M(date)
  let dto = {
    invites,
    startDate: _date,
    selected: {
      year: _date.year(),
      month: _date.month() + 1,
      day: _date.day(),
    },
    today: {
      year: today.year(),
      month: today.month(),
      day: today.day(),
    },
    daysInMonth: _date.daysInMonth(),
  }
  return dto
}

export const calendarDayStyle = (selectedDate, current, dir) => {
  let today = M()
  if (dir !== 0) {
    return "cal-day notThisMonth"
  }

  if (
    today.isSame(current, "day") &&
    today.isSame(current, "month") &&
    today.isSame(current, "year") &&
    selectedDate.isSame(current, "date")
  ) {
    return "selectedDay isToday"
  }

  if (
    today.isSame(current, "day") &&
    today.isSame(current, "month") &&
    today.isSame(current, "year")
  ) {
    return "cal-day isToday"
  }
  if (selectedDate.isSame(current, "date")) {
    return "cal-day selectedDay"
  } else return "cal-day"
}
