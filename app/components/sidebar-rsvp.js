import { EmptyState, InviteRSVP } from "Components"
import { getTimeFormat, getTheme, hyphenize } from "Utils"
import { InfoStandardLine } from "@mithril-icons/clarity/cjs"

const navToInvite = (mdl) => (invite) => {
  mdl.Events.currentEventId(invite.eventId)
  mdl.Events.currentEventStart(invite.start)
  localStorage.setItem("shindigit-eventId", invite.eventId)
  localStorage.setItem("shindigit-eventStart", invite.start)
  m.route.set(`/${hyphenize(mdl.User.name)}/events/${hyphenize(invite.title)}`)
}

export const SidebarRSVP = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".sidebar-rsvp mb-50", [
        mdl.Invites.needRSVP().length
          ? mdl.Invites.needRSVP().map((invite) => {
              return m(
                `.sidebar-invites-${getTheme(mdl)}`,

                m(".frow mb-10", [
                  m(".col-xs-1-2 text-ellipsis", `${invite.title}`),
                  m(".col-xs-1-2", `On: ${invite.start.format("MM-DD-YYYY")}`),
                  m(
                    ".col-xs-1-2",
                    `From: ${invite.start.format(getTimeFormat(mdl))}`
                  ),
                  m(
                    ".col-xs-1-2",
                    `To: ${invite.end.format(getTimeFormat(mdl))}`
                  ),
                ]),

                m(InfoStandardLine, {
                  class: "clickable",
                  onclick: (e) => navToInvite(mdl)(invite),
                }),

                m(InviteRSVP, {
                  mdl,
                  guest: invite,
                })
              )
            })
          : m(EmptyState, { text: "You have no outstanding invites" }),
      ]),
  }
}
