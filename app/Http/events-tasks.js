import Task from "data.task"
import { getInvitesTask } from "./invites-tasks"
import { compose, filter, head, propEq } from "ramda"
import { getHour, getMin, displayTimeFormat } from "Utils"

const toEventviewModel = (mdl) => ({
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

export const getEventTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(`data/Events/${mdl.Events.currentEventId()}`)
    .map(toEventviewModel(mdl))

export const loadEventAndInviteTask = (http) => (mdl) =>
  Task.of((event) => (invite) => {
    return {
      event,
      invite,
    }
  })
    .ap(getEventTask(http)(mdl))
    .ap(
      getInvitesTask(http)(mdl).map(
        compose(head, filter(propEq("eventId", mdl.Events.currentEventId())))
      )
    )

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
      return http.backEnd
        .postTask(mdl)("data/Invites")({
          eventId,
          userId: ownerId,
          status: 1,
          end,
          start,
          title,
          allDay,
          inPerson,
          location,
          latlong,
        })
        .chain(({ objectId }) => {
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
