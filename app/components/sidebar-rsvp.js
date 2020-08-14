import { EmptyState, InviteRSVP } from "Components"
import { getTimeFormat } from "Utils"

export const SidebarRSVP = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".sidebar-rsvp", [
        mdl.Invites.needRSVP().length
          ? mdl.Invites.needRSVP().map((invite) => {
              return m(
                ".sidebar-invites",
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
                m(InviteRSVP, {
                  mdl,
                  updateFn: (x) => {
                    console.log("remove x from ...", x)
                  },
                  guest: invite,
                })
              )
            })
          : m(EmptyState, { text: "You have no outstanding invites" }),
      ]),
  }
}
