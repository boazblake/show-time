import { range } from "./index"
// import moment from "moment"

export const padding = (d) => (d.toString().length == 1 ? pad0Left(d) : d)
export const pad00Min = (num) => `${num}:00`
export const pad0Left = (num) => `0${num}`

export const getHoursInDay = (format) =>
  range(format == "24hrs" ? 24 : 12)
    .map((n) => (n.toString().length == 1 ? pad0Left(n) : n))
    .map(pad00Min)

export const datesAreSame = (first) => (second) => (format) => {
  let f = M.utc(first).format(format)
  let s = M.utc(second).format(format)

  return M.utc(f).isSame(M.utc(s))
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
  "Monday",
  "Teusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

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
