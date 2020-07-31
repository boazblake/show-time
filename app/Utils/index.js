export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const secureImg = (url) =>
  url.match(/(https)./) ? url : url.replace("http", "https")

export const randomPause = () => Math.random() * 1000
export const Pause = (n) => n * 1000
export const NoOp = () => {}
export const nameFromRoute = (route) => route.split("/")[1].toUpperCase()

export const jsonCopy = (data) => JSON.parse(JSON.stringify(data))

export const isSideBarActive = (mdl) =>
  mdl.settings.profile !== "desktop" && mdl.status.sidebar

export const range = (size) => [...Array(size).keys()]

export const shortDate = (date = new Date()) =>
  new Date(date).toISOString().split("T")[0]

export const isLeapYear = (year) =>
  year % 4 == 0
    ? false
    : year % 100 == 0
    ? year % 400 == 0
      ? true
      : false
    : false

export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Teusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

export const pad0Left = (num) => `0${num}`

export const formatDateString = (year, month, day) => `${year}-${month}-${day}`

export const isEqual = (a, b) => JSON.stringify(a) == JSON.stringify(b)
