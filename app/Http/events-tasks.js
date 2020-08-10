import Task from "data.task"
import {
  getInvitesTaskByEventId,
  createInviteTask,
  getUserProfileTask,
  getItemsTask,
} from "Http"
import { compose, traverse, prop, filter, head, pluck } from "ramda"
import { log, getHour, getMin, displayTimeFormat } from "Utils"

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
    date: M.utc(start).format("DD-MM-YYYY"),
    title: title.toUpperCase(),
    start,
    end,
    startTime: M.utc(start).format(displayTimeFormat(mdl)),
    endTime: M.utc(end).format(displayTimeFormat(mdl)),
    notes,
    allDay,
    location,
    inPerson,
    latlong,
  }
}

const toGuestModel = (invite) => ({ name, email }) => ({
  ...invite,
  name,
  email,
})

const getProfilesTask = (http) => (mdl) => (invite) =>
  getUserProfileTask(http)(mdl)(invite.userId)
    .map(head)
    .map(toGuestModel(invite))

const getEventGuestsTask = (http) => (mdl) =>
  getInvitesTaskByEventId(http)(mdl)(mdl.Events.currentEventId()).chain(
    traverse(Task.of, getProfilesTask(http)(mdl))
  )

export const getEventTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(`data/Events/${mdl.Events.currentEventId()}`)
    .map(toEventviewModel(mdl))

export const loadEventTask = (http) => (mdl) =>
  Task.of((event) => (items) => (guests) => {
    return {
      event,
      guests,
      items,
    }
  })
    .ap(getEventTask(http)(mdl))
    .ap(getItemsTask(http)(mdl))
    .ap(getEventGuestsTask(http)(mdl))

export const deleteEventTask = (http) => (mdl) => (id) =>
  http.backEnd
    .deleteTask(mdl)(`data/Events/${id}`)
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Invites?where=eventId%3D'${id}'`)
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
  let end = M.utc(mdl.selectedDate())
    .hour(getHour(endTime))
    .minute(getMin(endTime))
  let start = M.utc(mdl.selectedDate())
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
