import Task from "data.task"

export const addItemTask = (http) => (mdl) => ({ name, quantity }) => {
  return http.backEnd
    .postTask(mdl)("data/Items")({
      eventId: mdl.Events.currentEventId(),
      name,
      quantity: parseInt(quantity),
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
            `data/Events/${mdl.Events.currentEventId()}/items%3AItems%3An`
          )([itemId])
        )
    })
}

export const getItemsTask = (http) => (mdl) =>
  http.backEnd.getTask(mdl)(
    `data/Items?pageSize=100&where=eventId%3D'${mdl.Events.currentEventId()}'&sortBy=name%20asc`
  )

export const deleteItemTask = (http) => (mdl) => (id) =>
  http.backEnd.deleteTask(mdl)(`data/Items/${id}`)

export const updateItemTask = (http) => (mdl) => (item) =>
  http.backEnd.putTask(mdl)(`data/Items/${item.objectId}`)(item)
