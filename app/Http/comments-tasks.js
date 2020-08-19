import Task from "data.task"

export const addCommentTask = (http) => (mdl) => (comment) => {
  return http.backEnd
    .postTask(mdl)("data/Comments")(comment)
    .chain(({ objectId }) => {
      let commentId = objectId
      return Task.of((user) => (event) => ({
        user,
        event,
      }))
        .ap(
          http.backEnd.postTask(mdl)(
            `data/Users/${mdl.User.objectId}/comments%3AComments%3An`
          )([commentId])
        )
        .ap(
          http.backEnd.postTask(mdl)(
            `data/Events/${mdl.Events.currentEventId()}/comments%3AComments%3An`
          )([commentId])
        )
    })
}

export const getCommentsByEventIdTask = (http) => (mdl) => (eventId) =>
  http.backEnd.getTask(mdl)(
    `data/Comments?pageSize=100&where=eventId%3D'${eventId}'&sortBy=created%20asc`
  )

export const getCommentsByguestIdTask = (http) => (mdl) => (guestId) =>
  http.backEnd.getTask(mdl)(
    `data/Comments?pageSize=100&where=guestId%3D'${guestId}'&sortBy=created%20asc`
  )

export const deleteBulkCommentsTask = (http) => (mdl) => (guestId) =>
  http.backEnd.deleteTask(mdl)(`data/Comments?where=guestId%3D'${guestId}'`)

export const deleteCommentTask = (http) => (mdl) => (id) =>
  http.backEnd.deleteTask(mdl)(`data/Comments/${id}`)

export const updateCommentTask = (http) => (mdl) => (comment) =>
  http.backEnd.putTask(mdl)(`data/Comments/${comment.objectId}`)(comment)
