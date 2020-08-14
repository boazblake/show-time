import { TimesCircleLine } from "@mithril-icons/clarity/cjs"
import { AttendanceResponse } from "Components"

export const InvitesToast = () => {
  return {
    view: ({ attrs: { mdl, style, invites } }) =>
      m(
        ".invite-alerts-container frow reverse",
        invites.map((invite, idx) =>
          m(
            ".invite-alert mb-10",
            style(idx),
            m(".frow mb-10", [
              m(".col-xs-1-2 text-ellipsis", `${invite.title}`),
              m(".col-xs-1-2", `On: ${invite.start.format("MM-DD-YYYY")}`),
              m(".col-xs-1-2", `From: ${invite.start.format("HH:mm")}`),
              m(".col-xs-1-2", `To: ${invite.end.format("HH:mm")}`),
            ]),
            m(AttendanceResponse, {
              mdl,
              guest: invite,
              updateFn: (x) => console.log("update this item", invite),
            }),
            m(TimesCircleLine, {
              onclick: (e) => {
                mdl.State.invitesToast().removeAt(idx)
                mdl.State.notifications.map((state) =>
                  state.invites.push(invite)
                )
                mdl.Home.fetch(true)
              },
              class: "invite-alert-remove",
            })
          )
        )
      ),
  }
}
