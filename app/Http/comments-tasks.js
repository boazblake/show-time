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

export const getCommentsByUserIdTask = (http) => (mdl) => (userId) =>
  http.backEnd.getTask(mdl)(
    `data/Comments?pageSize=100&where=userId%3D'${userId}'&sortBy=created%20asc`
  )

export const deleteBulkCommentsTask = (http) => (mdl) => (userId) =>
  http.backEnd.deleteTask(mdl)(`data/Comments?where=userId%3D'${userId}'`)

export const deleteCommentTask = (http) => (mdl) => (id) =>
  http.backEnd.deleteTask(mdl)(`data/Comments/${id}`)

export const updateCommentTask = (http) => (mdl) => (comment) =>
  http.backEnd.putTask(mdl)(`data/Comments/${comment.objectId}`)(comment)
