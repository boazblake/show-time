import {
  eachDayOfInterval,
  endOfISOWeek,
  endOfMonth,
  isSameMonth,
  startOfISOWeek,
  startOfMonth,
  eachWeekOfInterval,
  format,
  differenceInMonths,
  parseISO,
} from "date-fns"
import {
  isLeapYear,
  formatDateString,
  pad0Left,
  monthsOfTheYear,
  shortDate,
  isEqual,
} from "Utils"

const updateYear = (year, dir) => (parseInt(year) + dir).toString()

const daysInMonth = (month, year) =>
  new Date(parseInt(year), parseInt(month) + 1, 0).getDate()

const updateMonth = (month, dir) =>
  (parseInt(month) + dir).toString().length == 1
    ? pad0Left((parseInt(month) + dir).toString())
    : (parseInt(month) + dir).toString()

export const goToDate = ({ year, month, day, dir }) => {
  let _year = year
  let _month = updateMonth(month, dir)
  let _day = day || "01"

  if (_month >= 13) {
    _year = updateYear(_year, dir)
    _month = "01"
  }

  if (_month <= 0) {
    _year = updateYear(_year, dir)
    _month = "12"
  }
  m.route.set(`/${formatDateString({ year: _year, month: _month, day: _day })}`)
}

export const updateMonthDto = (year, month, day, dir) => {
  let _year = year
  let _month = updateMonth(month, dir)
  let _day = day || "01"

  if (_month >= 13) {
    _year = updateYear(_year, dir)
    _month = "01"
  }

  if (_month <= 0) {
    _year = updateYear(_year, dir)
    _month = "12"
  }

  return calendarModel(
    formatDateString({ year: _year, month: _month, day: _day })
  )
}

export const getMonthByIdx = (idx) =>
  idx >= 12
    ? monthsOfTheYear[0]
    : idx < 0
    ? monthsOfTheYear[11]
    : monthsOfTheYear[idx]

export const isCalenderDay = (date) => ({
  day: format(date, "dd"),
  dir: 0,
})

export const isNotCalenderDay = (day, date) => ({
  day: format(day, "dd"),
  dir: differenceInMonths(parseISO(shortDate(date)), day) == 0 ? -1 : +1,
})

export const createCalendarDayViewModel = (day, date, { isSameMonth }) =>
  isSameMonth ? isCalenderDay(day) : isNotCalenderDay(day, date)

export const getMonthMatrix = ({ year, month }) => {
  const date = new Date(parseInt(year), parseInt(month - 1))
  const matrix = eachWeekOfInterval(
    {
      start: startOfMonth(date),
      end: endOfMonth(date),
    },
    { weekStartsOn: 1 }
  )

  return matrix.map((weekDay) =>
    eachDayOfInterval({
      start: startOfISOWeek(weekDay),
      end: endOfISOWeek(weekDay),
    }).map((day) =>
      createCalendarDayViewModel(day, date, {
        isSameMonth: isSameMonth(date, day),
      })
    )
  )
}

export const calendarModel = (date = shortDate()) => {
  let _date = shortDate(date).split("-")
  let today = shortDate().split("-")
  let year = _date[0]
  let month = _date[1]
  let day = _date[2]

  let dto = {
    isLeapYear: isLeapYear(year),
    startDate: date,
    selected: { year, month, day },
    today: {
      year: today[0],
      month: today[1],
      day: today[2],
    },
    year,
    month,
    day,
    daysInMonth: daysInMonth(month, year),
  }
  return dto
}

export const calendarDay = ({ today, selected }) => (currentDay, dir) => {
  let cs = ""
  if (dir !== 0) {
    return "notThisMonth"
  }
  if (
    isEqual(today.day, currentDay) &&
    isEqual(today.month, selected.month) &&
    isEqual(today.year, selected.year)
  ) {
    return "isToday"
  }

  if (
    isEqual(currentDay, selected.day) &&
    isEqual(selected.month, selected.month) &&
    isEqual(selected.year, today.year)
  ) {
    return "selectedDay"
  }
}
