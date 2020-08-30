import { getHoursInDay } from "Utils"
import { calendarModel } from "Components/calendar/calendar-model"

// const Notifications = () => {
//   let state = {
//     invites: Stream([]),
//     items: Stream([]),
//     guests: Stream([]),
//   }

//   return {
//     invites: state.invites,
//     items: state.items,
//     guests: state.guests,
//     count: Stream.combine(
//       (invites, items, guests) =>
//         invites().length + items().length + guests().length,z,xnbkzjb/sNV/LZFNG
//       [state.invites, state.items, state.guests]
//     ),
//   }
// }

const Map = {
  locale: Stream(null),
  bounds: Stream(encodeURIComponent("-125.5957, 24.36711, -65.39063, 48.944")),
  defaultBounds: encodeURIComponent("-125.5957, 24.36711, -65.39063, 48.944"),
}

const State = {
  isAuth: Stream(false),
  modal: Stream(false),
  isLoading: Stream(false),
  loadingProgress: { max: 0, value: 0 },
  isLoggedIn: () => sessionStorage.getItem("token"),
  is24Hrs: Stream(true),
  toAnchor: Stream(false),
  slug: "",
}

export const dayModel = (mdl) =>
  getHoursInDay().reduce((day, hour) => {
    day[hour] = []
    // console.log(day, hour)
    return day
  }, {})

const Events = {
  currentEventId: Stream(null),
  currentEventStart: Stream(null),
  createNewEvent: Stream(false),
  updateEvent: Stream(false),
  fetch: Stream(false),
  isMember: Stream(false),
}

const Invites = {
  state: { error: null, status: Stream("loading") },
  withRSVP: Stream([]),
  needRSVP: Stream([]),
  fetch: Stream(false),
}

const Items = {
  updateItemAndGuest: Stream(false),
}

const Day = {
  data: dayModel({ State }),
  update: Stream(false),
  listView: Stream(true),
}

const Home = {}

const Settings = { profile: "", inspector: "" }

const Calendar = {
  data: calendarModel({ mdl: Model, invites: [], date: M() }),
  state: { start: Stream(0) },
}
const User = {}

const Sidebar = {
  isShowing: Stream(false),
}

const Model = {
  selectedDate: Stream(""),
  todayDate: Stream(M()),
  Calendar,
  Day,
  Events,
  Invites,
  State,
  Settings,
  User,
  Home,
  Sidebar,
  Map,
  Items,
}

export default Model
