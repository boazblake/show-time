import { differenceInMinutes } from "date-fns"
import { getFullDate } from "Utils"

const Event = ({ attrs: { mdl } }) => {
  const getHeight = ([startHour, startMin], [endHour, endMin]) => {
    const startDate = getFullDate(mdl.selectedDate, startHour, startMin)
    const endDate = getFullDate(mdl.selectedDate, endHour, endMin)
    return differenceInMinutes(startDate, endDate)
  }

  return {
    view: ({ attrs: { mdl, event, col } }) => {
      console.log(
        differenceInMinutes(
          new Date(event.endTime),
          new Date(event.startTime)
        ) * 2
      )
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          ".event-list-item ",
          {
            onclick: (e) =>
              m.route.set(
                `/${mdl.user.name}/${mdl.currentShortDate()}/${
                  event.start.hour
                }/${event.start.min}`
              ),
            style: {
              top: `${event.start.min}px`,
              height: `${
                differenceInMinutes(
                  new Date(event.endTime),
                  new Date(event.startTime)
                ) * 2
              }px`,
            },
          },
          event.title
        )
      )
    },
  }
}

export const EventsList = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { events } }) =>
      m(
        ".event-list frow ",
        events.map((event, idx) =>
          m(Event, { mdl, event, col: events.length, key: idx })
        )
      ),
  }
}
