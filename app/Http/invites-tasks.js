import { map } from "ramda"

export const toInviteViewModel = ({
  start,
  end,
  title,
  objectId,
  eventId,
  status,
  userId,
}) => ({
  start: M.utc(start),
  end: M.utc(end),
  objectId,
  eventId,
  title,
  status,
  userId,
})

const toInviteDto = ({ start, end, title, eventId, status, userId }) => ({
  start,
  end,
  eventId,
  title,
  status,
  userId,
})

export const updateInviteTask = (http) => (mdl) => (invite) =>
  http.backEnd
    .putTask(mdl)(`data/Invites/${invite.objectId}`)(toInviteDto(invite))
    .map(toInviteViewModel)

export const getInvitesTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=userId%3D'${mdl.User.objectId}'`
    )
    .map(map(toInviteViewModel))
