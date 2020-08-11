import { map } from "ramda"
import { findUserByEmailTask } from "Http"
import Task from "data.task"

export const toInviteViewModel = ({
  start,
  end,
  title,
  objectId,
  eventId,
  status,
  userId,
}) => ({
  start: M(start),
  end: M(end),
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

export const getInvitesByUserIdTask = (http) => (mdl) => (userId) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=userId%3D'${userId}'&sortBy=start%20asc`
    )
    .map(map(toInviteViewModel))

export const getInvitesTaskByEventId = (http) => (mdl) => (eventId) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=eventId%3D'${eventId}'&sortBy=start%20asc`
    )
    .map(map(toInviteViewModel))

export const sendInviteTask = (http) => (mdl) => (
  guestEmail,
  { eventId, start, end, title, allDay, inPerson, location, latlong }
) =>
  findUserByEmailTask(http)(mdl)(guestEmail).chain((users) =>
    users.any()
      ? createInviteTask(http)(mdl)({
          eventId,
          userId: users[0].objectId,
          status: 2,
          end,
          start,
          title,
          allDay,
          inPerson,
          location,
          latlong,
        })
      : Task.rejected("No User with that email")
  )

export const createInviteTask = (http) => (mdl) => ({
  eventId,
  userId,
  status,
  end,
  start,
  title,
  allDay,
  inPerson,
  location,
  latlong,
}) =>
  http.backEnd.postTask(mdl)("data/Invites")({
    eventId,
    userId,
    status,
    end,
    start,
    title,
    allDay,
    inPerson,
    location,
    latlong,
  })

export const deleteInviteTask = (http) => (mdl) => (id) =>
  http.backEnd.deleteTask(mdl)(`data/Invites/${id}`)
