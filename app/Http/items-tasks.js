export const addItemTask = (http) => (mdl) => (item) =>
  http.backEnd.postTask(mdl)("data/Items")(item)

export const getItemsByEventIdTask = (http) => (mdl) => (eventId) =>
  http.backEnd.getTask(mdl)(
    `data/Items?pageSize=100&where=eventId%3D'${eventId}'&sortBy=name%20asc`
  )

export const getItemsByGuestIdTask = (http) => (mdl) => (guestId) =>
  http.backEnd.getTask(mdl)(
    `data/Items?pageSize=100&where=guestId%3D'${guestId}'&sortBy=name%20asc`
  )

export const deleteBulkItemsTask = (http) => (mdl) => (guestId) =>
  http.backEnd.deleteTask(mdl)(`data/Items?where=guestId%3D'${guestId}'`)

export const deleteItemTask = (http) => (mdl) => (itemId) =>
  http.backEnd.deleteTask(mdl)(`data/Items/${itemId}`)

export const updateItemTask = (http) => (mdl) => (item) =>
  http.backEnd.putTask(mdl)(`data/Items/${item.objectId}`)(item)
