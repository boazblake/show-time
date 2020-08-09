import Task from "data.task"

export const addItemTask = (http) => (mdl) => ({ name, quantity }) => {
  return http.backEnd
    .postTask(mdl)("data/Items")({
      name,
      quantity,
    })
    .chain(({ objectId }) => {
      let itemId = objectId
      return Task.of((user) => (event) => ({
        user,
        event,
      }))
        .ap(
          http.backEnd.postTask(mdl)(
            `data/Users/${mdl.User.objectId}/items%3AItems%3An`
          )([itemId])
        )
        .ap(
          http.backEnd.postTask(mdl)(
            `data/Events/${itemId}/items%3AItems%3An`
          )([itemId])
        )
    })
}
