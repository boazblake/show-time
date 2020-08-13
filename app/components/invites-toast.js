import { TimesCircleLine } from "@mithril-icons/clarity/cjs"
import { AttendanceResponse } from "Components"
import { HTTP, updateInviteTask } from "Http"

export const InvitesToast = ({ attrs: { mdl, reLoad } }) => {
  const updateInvite = (mdl) => (update) => {
    const onError = (error) => {
      state.error = jsonCopy(error)
      state.status = "failed"
      console.log("invite update failed", state, update)
    }

    const onSuccess = (dto) => {
      console.log("success", dto)
      reLoad({ attrs: { mdl } })
    }

    updateInviteTask(HTTP)(mdl)(update).fork(onError, onSuccess)
  }

  const stackInvites = (idx, name) => {
    let bIdx = 87
    let lIdx = -5
    let bottom = idx * 80 + bIdx
    let left = lIdx * idx
    console.log("idx", name, idx, bottom)
    return {
      style: {
        // left: `-${left}px`,
        bottom: `${bottom}px`,
      },
    }
  }

  return {
    view: ({ attrs: { mdl, invites } }) =>
      m(
        ".invite-alerts-container frow reverse",
        invites.map((invite, idx) =>
          m(
            ".invite-alert",
            stackInvites(idx, invite.title),
            invite.title,
            m(AttendanceResponse, {
              mdl,
              guest: invite,
              updateInvite,
            }),
            m(TimesCircleLine, {
              onclick: (e) => console.log(invite.title),
              class: "invite-alert-remove",
            })
          )
        )
      ),
  }
}
