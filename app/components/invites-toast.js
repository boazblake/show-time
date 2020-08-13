import { TimesCircleLine } from "@mithril-icons/clarity/cjs"
import { AttendanceResponse } from "Components"

export const InvitesToast = ({ attrs: { mdl, reLoad } }) => {
  const stackInvites = (idx, name) => {
    let bIdx = 87
    let lIdx = -5
    let bottom = idx * 80 + bIdx
    let left = lIdx * idx
    // console.log("idx", name, idx, bottom)
    return {
      style: {
        // left: `-${left}px`,
        bottom: `${bottom}px`,
      },
    }
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".invite-alerts-container frow reverse",
        mdl.State.invitesToast().map((invite, idx) =>
          m(
            ".invite-alert",
            stackInvites(idx, invite.title),
            invite.title,
            m(AttendanceResponse, {
              mdl,
              guest: invite,
            }),
            m(TimesCircleLine, {
              onclick: (e) => {
                mdl.State.invitesToast().removeAt(idx)
                mdl.State.notifications.map((state) =>
                  state.invites.push(invite)
                )
              },
              class: "invite-alert-remove",
            })
          )
        )
      ),
  }
}
