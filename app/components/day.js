import { InvitesList } from "Components"
import { log, getHoursInDay, firstInviteHour } from "Utils"

const scrollToCurrentTimeOrInvite = (mdl, invites) => {
  let first = firstInviteHour(invites)
  let hour = mdl.State.toAnchor()
    ? mdl.State.toAnchor()
    : first
    ? first
    : M().format("HH")
  let el = document.getElementById(`${hour}:00`)
  el &&
    el.scrollIntoView({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
}

export const Hour = () => {
  return {
    view: ({ attrs: { mdl, hour, events } }) => {
      return m(
        ".frow ",
        m(".hour ", [
          m("p.hour-time", { id: hour }, hour),
          [m(InvitesList, { mdl, events })],
        ])
      )
    },
  }
}

const ListView = () => {
  return {
    view: ({ attrs: { mdl, invites } }) =>
      m(
        "ul.frow-container",
        invites.map((invite) =>
          m("li.shadow-light", [invite.title, invite.startTime])
        )
      ),
  }
}

export const Day = ({ attrs: { mdl } }) => {
  return {
    oncreate: ({ attrs: { mdl, invites } }) =>
      scrollToCurrentTimeOrInvite(mdl, invites),
    onupdate: ({ attrs: { mdl, invites } }) =>
      mdl.State.toAnchor() && scrollToCurrentTimeOrInvite(mdl, invites),
    view: ({ attrs: { mdl, day, invites } }) => {
      return m(".day", [
        m(".day-container", [
          mdl.Day.listView()
            ? m(ListView, { mdl, invites })
            : getHoursInDay(mdl.State.timeFormats[mdl.State.format()]).map(
                (hour, idx) => {
                  return m(Hour, {
                    mdl,
                    invites: day[hour],
                    hour,
                    events: day[hour],
                  })
                }
              ),
        ]),
      ])
    },
  }
}
