const Invite = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl, invite, col } }) => {
      // console.log(invite)
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          ".invite-list-item ",
          {
            onclick: (e) => {
              mdl.Events.currentEventId(invite.eventId)
              m.route.set(
                `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}/${
                  invite.start.hour
                }/${invite.start.min}`
              )
            },
            style: {
              top: `${invite.start.min}px`,
              height: `${
                M.utc(invite.endTime).diff(invite.startTime, "minutes") * 2
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
