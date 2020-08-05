import Task from "data.task"
import { getInvitesTask } from "./invites-tasks"
import { compose, filter, head, propEq } from "ramda"

const toEventviewModel = ({ start, end, title, notes, allDay }) => {
  return {
    date: M.utc(start).format("DD-MM-YYYY"),
    title: title.toUpperCase(),
    start,
    end,
    startTime: M.utc(start).format("HH:mm"),
    endTime: M.utc(end).format("HH:mm"),
    notes,
    allDay,
  }
}

export const getEventTask = (http) => (mdl) =>
  http.backEnd
    .getTask(mdl)(`data/Events/${mdl.Events.currentEventId()}`)
    .map(toEventviewModel)

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
}) => {
  let getHour = (time) => time.split(":")[0]
  let getMin = (time) => time.split(":")[1]
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
