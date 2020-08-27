import { map } from "ramda"
import {
  findUserByEmailTask,
  relateInvitesToEventTask,
  relateInvitesToUserTask,
} from "Http"
import Task from "data.task"

export const toInviteViewModel = ({
  start,
  end,
  title,
  objectId,
  eventId,
  status,
  hostId,
  guestId,
  updated,
}) => ({
  start: M(start),
  end: M(end),
  objectId,
  eventId,
  title,
  status,
  hostId,
  guestId,
  updated,
})

const toInviteDto = ({
  start,
  end,
  title,
  eventId,
  status,
  guestId,
  hostId,
}) => ({
  start,
  end,
  eventId,
  title,
  status,
  guestId,
  hostId,
})

export const updateBulkInvites = (http) => (mdl) => (cond) => (update) =>
  http.backEnd.putTask(mdl)(
    `data/bulk/Invites?where=${encodeURIComponent(cond)}`
  )(update)

export const updateInviteTask = (http) => (mdl) => (inviteId) => (invite) =>
  http.backEnd
    .putTask(mdl)(`data/Invites/${inviteId}`)(toInviteDto(invite))
    .map(toInviteViewModel)

export const getInvitesByGuestIdTask = (http) => (mdl) => (guestId) =>
  http.backEnd
    .getTask(mdl)(
      `data/Invites?pageSize=100&where=guestId%3D'${guestId}'&sortBy=start%20asc`
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
  { hostId, eventId, start, end, title, allDay, inPerson, location, latlong }
) =>
  findUserByEmailTask(http)(mdl)(guestEmail).chain((users) =>
    users.any()
      ? createInviteTask(http)(mdl)({
          eventId,
          guestId: users[0].objectId,
          hostId,
          status: 2,
          end,
          start,
          title,
          allDay,
          inPerson,
          location,
          latlong,
        }).chain(({ objectId }) =>
          Task.of((event) => (user) => {
            event, user
          })
            .ap(
              relateInvitesToUserTask(http)(mdl)(users[0].objectId)([objectId])
            )
            .ap(relateInvitesToEventTask(http)(mdl)(eventId)([objectId]))
        )
      : Task.rejected("No User with that email")
  )

export const createInviteTask = (http) => (mdl) => ({
  eventId,
  guestId,
  hostId,
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
    guestId,
    hostId,
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
