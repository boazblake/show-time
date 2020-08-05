import { map } from "ramda"

export const toInviteViewModel = ({
  start,
  end,
  title,
  objectId,
  eventId,
  status,
}) => ({
  start: M.utc(start),
  end: M.utc(end),
  inviteId: objectId,
  eventId,
  title,
  status,
})

export const fetchInvitesTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=userId%3D'${mdl.User.objectId}'`
    )
    .map(map(toInviteViewModel))
