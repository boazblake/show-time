import { differenceInMinutes } from "date-fns"
import { getFullDate } from "Utils"

const Invite = ({ attrs: { mdl } }) => {
  const getHeight = ([startHour, startMin], [endHour, endMin]) => {
    const startDate = getFullDate(mdl.selectedDate, startHour, startMin)
    const endDate = getFullDate(mdl.selectedDate, endHour, endMin)
    return differenceInMinutes(startDate, endDate)
  }

  return {
    view: ({ attrs: { mdl, invite, col } }) => {
      // console.log(
      //   invite,
      //   differenceInMinutes(
      //     new Date(invite.endTime),
      //     new Date(invite.startTime)
      //   ) * 2
      // )
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          ".invite-list-item ",
          {
            onclick: (e) => {
              mdl.currentEventId(invite.eventId)
              m.route.set(
                `/${mdl.user.name}/${mdl.currentShortDate()}/${
                  invite.start.hour
                }/${invite.start.min}`
              )
            },
            style: {
              top: `${invite.start.min}px`,
              height: `${
                differenceInMinutes(
                  new Date(invite.endTime),
                  new Date(invite.startTime)
                ) * 2
              }px`,
            },
          },
          invite.title
        )
      )
    },
  }
}

export const InvitesList = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { events } }) =>
      m(
        ".invite-list frow ",
        events.map((invite, idx) =>
          m(Invite, { mdl, invite, col: events.length, key: idx })
        )
      ),
  }
}
