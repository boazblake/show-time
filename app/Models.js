import { getHoursInDay } from "Utils"
import { calendarModel } from "Components/calendar/calendar-model"

const State = {
  isAuth: Stream(false),
  modal: Stream(false),
  isLoading: Stream(false),
  loadingProgress: { max: 0, value: 0 },
  isLoggedIn: () => sessionStorage.getItem("token"),
  timeFormats: ["12hrs", "24hrs"],
  format: Stream(1),
  toAnchor: Stream(false),
  slug: "",
}

export const dayModel = (mdl) =>
  getHoursInDay(mdl.State.timeFormats[mdl.State.format()]).reduce(
    (day, hour) => {
      day[hour] = []
      return day
    },
    {}
  )

export const inviteModel = () => ({
  eventId: "",
  status: "",
  userId: "",
})

const Events = {
  currentEventId: Stream(null),
  currentEventStartTime: Stream(null),
}
const Invites = {
  fetch: Stream(false),
}
const Day = {
  data: dayModel({ State }),
  update: Stream(false),
}

const Settings = { profile: "", inspector: "" }

const Calendar = {
  data: calendarModel({ mdl: Model, invites: [], date: M.utc() }),
}
const User = {}

const Model = {
  // currentShortDate: Stream(""), //REMOVE
  // currentLongDate: Stream(""), //REMOVE
  selectedDate: Stream(""), //KEEP
  todayDate: Stream(M.utc()),
  // selectedDate: { year: "", month: "", day: "" }, //REMOVE
  Calendar,
  Day,
  Events,
  Invites,
  State,
  Settings,
  User,
}

export default Model
