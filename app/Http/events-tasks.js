import Task from "data.task"
import moment from "moment"

const toEventviewModel = ({ startTime, endTime, title, notes, status }) => ({
  date: moment.utc(startTime).format("DD-MM-YYYY"),
  title: title.toUpperCase(),
  begin: moment.utc(startTime).format("HH:MM"),
  end: moment.utc(endTime).format("HH:MM"),
  notes,
  status,
})

export const getEventTask = (http) => (mdl) => (state) =>
  http.backEnd
    .getTask(mdl)(`data/Events/${state.eventId}`)
    .map(toEventviewModel)

export const deleteEventTask = (http) => (mdl) => (state) =>
  http.backEnd
    .deleteTask(mdl)(`data/Events/${state.eventId}`)
    .chain(() =>
      http.backEnd.deleteTask(mdl)(
        `data/bulk/Invites?where=eventId%3D'${state.eventId}'`
      )
    )

export const updateEventTask = (http) => (mdl) => (state) =>
  http.backEnd
    .putTask(mdl)(`data/Events/${state.eventId}`)
    .chain(() =>
      http.backEnd.updateTask(mdl)(
        `data/Invites?where=eventId%3D'${state.eventId}'`
      )
    )

export const submitEventTask = (http) => (mdl) => ({
  allday,
  startTime,
  endTime,
  title,
  notes,
}) => {
  let getHour = (time) => time.split(":")[0]
  let getMin = (time) => time.split(":")[1]
  let { year, month, day } = mdl.selectedDate

  return http.backEnd
    .postTask(mdl)("data/Events")({
      endTime: new Date(
        year,
        month - 1,
        day,
        getHour(endTime),
        getMin(endTime)
      ),
      startTime: new Date(
        year,
        month - 1,
        day,
        getHour(startTime),
        getMin(startTime)
      ),
      status: 1,
      notes,
      title,
      allday,
      createdBy: mdl.user.objectId,
    })
    .chain(
      ({ objectId, ownerId, endTime, startTime, allDay, title, status }) => {
        let eventId = objectId
        return http.backEnd
          .postTask(mdl)("data/Invites")({
            eventId,
            userId: ownerId,
            status,
            endTime,
            startTime,
            allDay,
            title,
          })
          .chain(({ objectId }) => {
            let inviteId = objectId
            return Task.of((user) => (event) => ({
              user,
              event,
            }))
              .ap(
                http.backEnd.postTask(mdl)(
                  `data/Users/${mdl.user.objectId}/invites%3AInvites%3An`
                )([inviteId])
              )
              .ap(
                http.backEnd.postTask(mdl)(
                  `data/Events/${eventId}/invites%3AInvites%3An`
                )([inviteId])
              )
          })
      }
    )
}
