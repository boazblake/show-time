import { getInviteStatusColor } from "Utils"

const createEventUrl = (invite) =>
  `${invite.start.format("YYYY-MM-DD")}/${invite.start.format(
    "HH"
  )}/${invite.start.format("mm")}`

const Invite = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl, invite, col } }) => {
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          ".invite-list-item ",
          {
            onclick: (e) => {
              mdl.Events.currentEventId(invite.eventId)
              m.route.set(`/${mdl.User.name}/${createEventUrl(invite)}`)
            },
            style: {
              "background-color": getInviteStatusColor(invite.status),
              top: `${invite.start.format("mm")}px`,
              height: `${invite.end.diff(invite.start, "minutes") * 2}px`,
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
