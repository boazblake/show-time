import { calendarModel } from "Components/calendar/model"
import { dayModel } from "Components"

const model = {
  toAnchor: Stream(false),
  timeFormats: ["12hrs", "24hrs"],
  format: Stream(1),
  currentShortDate: Stream(""),
  currentLongDate: Stream(new Date()),
  selectedDate: { year: "", month: "", day: "" },
  Calendar: {
    data: calendarModel(),
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
