// import eachHourOfInterval from "date-fns/fp/eachHourOfInterval"
// import add from "date-fns/fp/add"
// import format from "date-fns/format"
// import parseISO from "date-fns/parseISO"
// import { formatDateString, shortDate } from "Utils"

// export const DailyPlanner = (mdl, selectedDate) => {
//   let longFormDate = parseISO(formatString(mdl.Calendar.data.selected))

//   let hours = getHoursInDay(mdl.format, longFormDate)
//   let today = mdl.data[shortDate(selectedDate)] || {
//     [shortDate(selectedDate)]: {},
//   }
//   return hours.reduce(toHourViewModel(shortDate(selectedDate)), today)
// }

// export const getHoursInDay = (dateFormat, selectedDate) => {
//   let interval = {
//     start: selectedDate,
//     end: add({ days: 1 })(selectedDate),
//   }
//   return eachHourOfInterval(interval).map((hour) => format(hour, dateFormat))
// }

// export const clockModel = (date) => {
//   const hours = getHoursInDay(mdl.clock.timeFormat, date)
//   console.log(hours)
//   return { [shortDate(date)]: hours }
// }
