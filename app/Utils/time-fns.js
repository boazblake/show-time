import { range } from "./index"
import moment from "moment"

export const padding = (d) => (d.toString().length == 1 ? pad0Left(d) : d)
export const pad00Min = (num) => `${num}:00`
export const pad0Left = (num) => `0${num}`

export const getHoursInDay = (format) =>
  range(format == "24hrs" ? 24 : 12)
    .map((n) => (n.toString().length == 1 ? pad0Left(n) : n))
    .map(pad00Min)

export const shortDate = (date) => {
  "double chec", date, new Date(date).toISOString().split("T")[0]
  return new Date(date).toISOString().split("T")[0]
}

export const isLeapYear = (year) =>
  year % 4 == 0
    ? false
    : year % 100 == 0
    ? year % 400 == 0
      ? true
      : false
    : false

export const datesAreSame = (first) => (second) => {
  let f = moment(first).utc().format("YYYY-MM-DD")
  let s = moment(second).utc().format("YYYY-MM-DD")

  return moment(f).isSame(moment(s))
}
export const isToday = (someDate) => {
  const today = new Date()
  const date = new Date(someDate)
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
