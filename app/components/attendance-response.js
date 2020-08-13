import { jsonCopy, inviteOptions } from "Utils"
import {
  SadFaceLine,
  HappyFaceLine,
  NeutralFaceLine,
  HappyFaceSolid,
  SadFaceSolid,
  NeutralFaceSolid,
} from "@mithril-icons/clarity/cjs"

const responses = () => [SadFaceLine, HappyFaceLine, NeutralFaceLine]
const selectedResponses = [SadFaceSolid, HappyFaceSolid, NeutralFaceSolid]
const getResponse = ({ status }) => {
  let rs = responses()
  rs.removeAt(status)
  rs.insertAt(status, selectedResponses[status])
  return rs
}
export const AttendanceResponse = () => {
  return {
    view: ({ attrs: { mdl, guest, updateInvite } }) => {
      return m(
        ".frow",
        getResponse(guest).map((response, idx) =>
          m(response, {
            class: guest.userId == mdl.User.objectId ? "clickable" : "",
            fill: `var(--${inviteOptions[idx]}-invite)`,
            onclick: (e) => {
              if (guest.userId == mdl.User.objectId) {
                guest.status = idx
                updateInvite(mdl)(guest)
              }
            },
          })
        )
      )
    },
  }
}
