import Task from "data.task"
import {
  getInvitesTaskByEventId,
  createInviteTask,
  getUserProfileTask,
  getItemsByEventIdTask,
  getCommentsByEventIdTask,
} from "Http"
import { traverse, head, map } from "ramda"
import { getHour, getMin, getTimeFormat } from "Utils"

const toEventviewModel = (mdl) => ({
  objectId,
  start,
  end,
  title,
  notes,
  allDay,
  location,
  inPerson,
  latlong,
}) => {
  return {
    eventId: objectId,
    date: M(start).format("MM-DD-YYYY"),
    title: title.toUpperCase(),
    start,
    end,
    startTime: M(start).format(getTimeFormat(mdl)),
    endTime: M(end).format(getTimeFormat(mdl)),
    notes,
    allDay,
    location,
    inPerson,
    latlong,
  }
}

const toCommentViewModel = ({
  message,
  sender,
  userId,
  eventId,
  created,
  objectId,
}) => ({
  message,
  sender,
  userId,
  eventId,
  created,
  objectId,
})

const toGuestModel = (invite) => ({ name, email }) => ({
  ...invite,
  name,
  email,
})

const getGuestsTask = (http) => (mdl) => (invite) =>
  getUserProfileTask(http)(mdl)(invite.userId)
    .map(head)
    .map(toGuestModel(invite))

const getEventGuestsByEventIdTask = (http) => (mdl) => (eventId) =>
  getInvitesTaskByEventId(http)(mdl)(eventId).chain(
    traverse(Task.of, getGuestsTask(http)(mdl))
  )

export const getEventByIdTask = (http) => (mdl) => (eventId) =>
  http.backEnd.getTask(mdl)(`data/Events/${eventId}`).map(toEventviewModel(mdl))

export const loadEventTask = (http) => (mdl) => (eventId) =>
  Task.of((event) => (items) => (comments) => (guests) => ({
    event,
    guests,
    comments,
    items,
  }))
    .ap(getEventByIdTask(http)(mdl)(eventId))
    .ap(getItemsByEventIdTask(http)(mdl)(eventId))
    .ap(
      getCommentsByEventIdTask(http)(mdl)(eventId).map(map(toCommentViewModel))
    )

    .ap(getEventGuestsByEventIdTask(http)(mdl)(eventId))

export const deleteEventTask = (http) => (mdl) => (id) =>
  http.backEnd
    .deleteTask(mdl)(`data/Events/${id}`)
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Invites?where=eventId%3D'${id}'`)
    )
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Items?where=eventId%3D'${id}'`)
    )
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Comments?where=eventId%3D'${id}'`)
    )

export const submitEventTask = (http) => (mdl) => ({
  allDay,
  startTime,
  endTime,
  title,
  notes,
  inPerson,
  location,
  latlong,
}) => {
  let end = M(mdl.selectedDate()).hour(getHour(endTime)).minute(getMin(endTime))
  let start = M(mdl.selectedDate())
    .hour(getHour(startTime))
    .minute(getMin(startTime))

  return http.backEnd
    .postTask(mdl)("data/Events")({
      end,
      start,
      notes,
      title,
      allDay,
      inPerson,
      location,
      latlong,
      createdBy: mdl.User.objectId,
    })
    .chain(({ objectId, ownerId, end, start, title }) => {
      let eventId = objectId
      let userId = ownerId
      let status = 1
      return createInviteTask(http)(mdl)({
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
      }).chain(({ objectId }) => {
        let inviteId = objectId
        return Task.of((user) => (event) => ({
          user,
          event,
        }))
          .ap(
            http.backEnd.postTask(mdl)(
              `data/Users/${mdl.User.objectId}/invites%3AInvites%3An`
            )([inviteId])
          )
          .ap(
            http.backEnd.postTask(mdl)(
              `data/Events/${eventId}/invites%3AInvites%3An`
            )([inviteId])
          )
      })
    })
}
