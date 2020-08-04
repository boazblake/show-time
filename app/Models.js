import { fromFullDate, getHoursInDay } from "Utils"

export const toInviteViewModel = ({
  startTime,
  endTime,
  title,
  objectId,
  eventId,
  status,
}) => ({
  startTime,
  endTime,
  start: fromFullDate(startTime),
  end: fromFullDate(endTime),
  inviteId: objectId,
  eventId,
  title,
  status,
})

export const inviteOptions = ["decline", "accept", "maybe"]

export const dayModel = (mdl, date = new Date()) =>
  getHoursInDay(mdl.timeFormats[mdl.format()]).reduce((day, hour) => {
    day[hour] = []
    return day
  }, {})

export const inviteModel = () => ({
  eventId: "",
  status: "",
  userId: "",
})

export const eventModel = () => ({})

const model = {
  reloadInvites: Stream(false),
  currentEventId: Stream(null),
  updateDay: Stream(false),
  toAnchor: Stream(false),
  timeFormats: ["12hrs", "24hrs"],
  format: Stream(1),
  currentShortDate: Stream(""),
  currentLongDate: Stream(""),
  selectedDate: { year: "", month: "", day: "" },
  Calendar: {
    data: {},
  },
  Day: {
    timeFormat: Stream("kk:mm"),
    data: dayModel({ timeFormats: ["24hrs"], format: Stream(0) }, new Date()),
  },
  state: {
    isAuth: Stream(false),
    modal: Stream(false),
    isLoading: Stream(false),
    loadingProgress: { max: 0, value: 0 },
    isLoggedIn: () => sessionStorage.getItem("token"),
  },
  settings: { profile: "", inspector: "" },
  slug: "",
}

export default model
