import { range } from "./index"
import { compose, map, head, sort, pluck } from "ramda"

export const padding = (d) => (d.toString().length == 1 ? pad0Left(d) : d)
export const pad00Min = (num) => `${num}:00`
export const pad0Left = (num) => `0${num}`

export const getHour = (time) => time.split(":")[0]
export const getMin = (time) => time.split(":")[1]

export const getTimeFormat = (mdl) =>
  mdl.User.profile.is24Hrs ? "HH:mm" : "h:mm a"

//need to fix to work for 12 hrs
export const getHoursInDay = (format) => {
  return range(24)
    .map((n) => {
      // console.log("n", n, M().hour(n).format('HH'))
      return M().hour(n).format("HH")
    })
    .map(pad00Min)
}

export const datesAreSame = (first) => (second) => (format) => {
  let f = M(first).format(format)
  let s = M(second).format(format)

  return M(f).isSame(M(s))
}
export const isToday = (someDate) => {
  const today = new Date()
  const date = new Date(someDate.toString())
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  )
}

export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Teusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const getFirstDay = (idx, weeks) => weeks[idx]

const getNextDay = (week, weeks) => {
  let lastDay = week[week.length - 1]
  let nextDayIdx =
    weeks.indexOf(lastDay) + 1 > 6
      ? 0
      : weeks.indexOf(lastDay) + 1 < 0
      ? 6
      : weeks.indexOf(lastDay) + 1
  return weeks[nextDayIdx]
}

const toStartOf = (idx, weeks) => (week, day) => {
  if (week.length == 7) return week
  week.length > 0
    ? week.push(getNextDay(week, weeks))
    : week.push(getFirstDay(idx, weeks))
  return week
}

export const daysOfTheWeekFrom = (idx) =>
  daysOfTheWeek.reduce(toStartOf(idx, daysOfTheWeek), [])

export const monthsOfTheYear = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const fromFullDate = (date) => {
  let d = new Date(date)
  return {
    day: padding(d.getDate()),
    month: padding(d.getMonth() + 1),
    year: d.getFullYear(),
    hour: padding(d.getHours()),
    min: padding(d.getMinutes()),
  }
}

export const getFullDate = ({ year, month, day }, startHour, startMin) => {
  console.log(
    "getFullDate",
    new Date(year, month - 1, day, startHour, startMin)
  )
  return new Date(year, month - 1, day, startHour, startMin)
}

export const toHourViewModel = (date) => (mdl, hour) => {
  if (!mdl[date][hour]) {
    mdl[date][hour] = {}
  }
  return mdl
}

export const shortDateString = ({ year, month, day }) =>
  `${year}-${padding(month)}-${padding(day)}`

export const firstInviteHour = compose(
  head,
  sort((a, b) => a - b),
  map((mStart) => mStart && parseInt(mStart.format("HH"))),
  pluck("start")
)
