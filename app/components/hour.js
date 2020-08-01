import { EventsList } from "Components"

export const Hour = () => {
  return {
    view: ({ attrs: { mdl, hour, time, events } }) => {
      return m(
        ".frow ",
        m(".hour ", [
          m("p.hour-time", time),
          [
            m(EventsList, { mdl, events }),
            m(".half-hour", m(".top")),
            m(".half-hour", m(".bottom")),
          ],
        ])
      )
    },
  }
}
