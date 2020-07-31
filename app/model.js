import { calendarModel } from "Components/calendar/model"

const model = {
  CalendarDto: {
    data: calendarModel(),
  },
  ClockDto: {
    format: "KK:mm",
    data: {},
  },
  state: {
    isLoading: false,
    loadingProgress: { max: 0, value: 0 },
    isLoggedIn: () => sessionStorage.getItem("token"),
  },
  routes: ["/"],
  status: { sidebar: false },
  settings: { profile: "", inspector: "" },
  snippets: [],
  slug: "",
}

export default model
