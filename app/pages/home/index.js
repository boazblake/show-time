import { Calendar, Clock } from "Components"

export const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".frow", [m(Calendar, { mdl }), m(Clock, { mdl })]),
  }
}
