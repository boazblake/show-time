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
    view: ({ attrs: { mdl, invite, updateInvite } }) => {
      console.log(invite)
      return m(
        ".frow",
        getResponse(invite).map((response, idx) =>
          m(response, {
            onclick: (e) => {
              invite.status = idx
              updateInvite(mdl)(invite)
            },
          })
        )
      )
    },
  }
}
