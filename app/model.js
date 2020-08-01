import { calendarModel } from "Components/calendar/model"
import Stream from "mithril-stream"

const model = {
  timeFormats: ["12hrs", "24hrs"],
  format: Stream(1),
  currentShortDate: Stream(""),
  currentLongDate: Stream(""),
  Calendar: {
    data: calendarModel(),
  },
  Clock: {
    timeFormat: Stream("kk:mm"),
    data: {},
  },
  state: {
    modal: Stream(false),
    isLoading: Stream(false),
    loadingProgress: { max: 0, value: 0 },
    isLoggedIn: () => sessionStorage.getItem("token"),
  },
  settings: { profile: "", inspector: "" },
  slug: "",
}

export default model
