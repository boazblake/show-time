import { inviteOptions } from "Utils"
import {
  SadFaceLine,
  HappyFaceLine,
  NeutralFaceLine,
  HappyFaceSolid,
  SadFaceSolid,
  NeutralFaceSolid,
} from "@mithril-icons/clarity/cjs"
import { HTTP, updateInviteTask } from "Http"

const updateInvite = (mdl) => (update) => (reload) => {
  const onError = (error) => {
    state.error = jsonCopy(error)
    state.status = "failed"
    console.log("invite update failed", state, update)
  }

  const onSuccess = (dto) => {
    if (reload) {
      reload()
    }
  }

  updateInviteTask(HTTP)(mdl)(update.objectId)(update).fork(onError, onSuccess)
}

const responses = () => [SadFaceLine, HappyFaceLine, NeutralFaceLine]
const selectedResponses = [SadFaceSolid, HappyFaceSolid, NeutralFaceSolid]
const getResponse = ({ status }) => {
  let rs = responses()
  rs.removeAt(status)
  rs.insertAt(status, selectedResponses[status])
  return rs
}
export const InviteRSVP = () => {
  return {
    view: ({ attrs: { mdl, guest, reload } }) => {
      // console.log("guest", guest)
      return m(
        ".frow justify-evenly",
        getResponse(guest).map((response, idx) =>
          m(response, {
            class: guest.guestId == mdl.User.objectId ? "clickable" : "",
            fill: `var(--${inviteOptions[idx]}-invite)`,
            onclick: (e) => {
              if (guest.guestId == mdl.User.objectId) {
                guest.status = idx
                updateInvite(mdl)(guest)(reload)
              }
            },
          })
        )
      )
    },
  }
}
