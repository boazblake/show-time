import { differenceInMinutes } from "date-fns"
import { getFullDate } from "Utils"
const splitTime = (time) => time.split(":")

const Event = ({ attrs: { mdl, event } }) => {
  const getHeight = ([startHour, startMin], [endHour, endMin]) => {
    const startDate = getFullDate(mdl.selectedDate, startHour, startMin)
    const endDate = getFullDate(mdl.selectedDate, endHour, endMin)
    return differenceInMinutes(startDate, endDate)
  }

  return {
    view: ({ attrs: { mdl, event, col } }) =>
      m(
        `.col-xs-1-${col + 2}`,
        m(
          ".event-list-item ",
          {
            style: {
              top: `${splitTime(event.startTime)[1]}px`,
              height: `${getHeight(
                splitTime(event.endTime),
                splitTime(event.startTime)
              )}px`,
            },
          },
          event.title
        )
      ),
  }
}

export const EventsList = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { events } }) =>
      m(
        ".event-list frow ",
        events.map((event) => m(Event, { mdl, event, col: events.length }))
      ),
  }
}
