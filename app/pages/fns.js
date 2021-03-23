import {
  anyPass,
  assoc,
  compose,
  equals,
  filter,
  find,
  join,
  lensPath,
  lensProp,
  map,
  not,
  over,
  pluck,
  propEq,
  prop,
  reject,
  set,
  sortBy,
  view,
} from "ramda"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

export const updateState = (state) => ({
  onkeyup: (e) => (state[e.target.name] = e.target.value),
})

const resetToast = (mdl) => {
  mdl.toast.show(false)
  mdl.toast.msg(null)
  mdl.toast.status(null)
}

export const makeToast = ({ mdl, status, msg }) => {
  mdl.toast.show(true)
  mdl.toast.status(status)
  mdl.toast.msg(msg)
  setTimeout(() => resetToast(mdl), mdl.toast.duration())
}

export const formatError = (error) => JSON.parse(JSON.stringify(error))

const getEpisodeLink = (label) => (path) => (links) => ({
  label,
  href: makeHttps(view(lensPath([path, "href"]), links)),
})

const formatDetailsLinks = (links) =>
  [
    getEpisodeLink("previous")("previousepisode")(links),
    getEpisodeLink("next")("nextepisode")(links),
  ].filter((ep) => !propEq("href", undefined)(ep))

const formatEpisodeLinks = (links) =>
  [getEpisodeLink("self")("self")(links)].filter(
    (ep) => !propEq("href", undefined)(ep)
  )

const toEpisodeViewModel = ({
  name,
  season,
  number,
  airdate,
  image,
  _links,
}) => ({
  name,
  season,
  number,
  airdate,
  image: image && (makeHttps(image.original) || makeHttps(image.medium)),
  links: formatEpisodeLinks(_links),
})

const toDetailsViewModel = ({
  image,
  tvmazeId,
  objectId,
  listStatus,
  name,
  notes,
}) => ({
  webChannel,
  status,
  network,
  genres,
  premiered,
  summary,
  _links,
}) => ({
  name,
  notes,
  genre: join(" ", genres),
  premiered,
  summary,
  links: formatDetailsLinks(_links),
  image,
  tvmazeId,
  objectId,
  listStatus,
  webChannel: webChannel && webChannel.name,
  network: network && network.name,
  status,
})

const makeHttps = (url) => url && url.replace("http:", "https:")

export const toSearchViewModel = ({ name, image, id }) => ({
  image: image && (makeHttps(image.original) || makeHttps(image.medium)),
  tvmazeId: id,
  name,
})

export const toDbModel = (userId) => ({
  listStatus,
  notes,
  name,
  tvmazeId,
  image,
  status,
}) => ({
  image,
  listStatus,
  notes,
  name,
  tvmazeId,
  status,
  userId,
})

export const onError = (mdl) => (type) => (error) => {
  mdl.errors[type](error)
  makeToast({ mdl, msg: JSON.parse(error).message, status: false })
}

const rejectWithAttr = (attr) => (value) => reject(propEq(attr, value))

const updateResults = (result) => (show) => {
  if (show) {
    return assoc(
      "objectId",
      show.objectId,
      set(lensProp("listStatus"), prop("listStatus", show), result)
    )
  } else {
    return result
  }
}

export const updateShowStatus = (shows) => (data) =>
  data.map((r) =>
    compose(updateResults(r), find(propEq("tvmazeId", r.tvmazeId)))(shows)
  )

export const getShows = (mdl) => (http) =>
  http
    .getTask(
      http.backendlessUrl(
        `data/${mdl.db}?pagesize=100&where=userId%3D'${mdl.user.data.objectId}'`
      )
    )
    .map(sortBy(propEq("name")))

export const searchShowsTask = (mdl) => (http) =>
  http
    .getTask(http.searchUrl(mdl.state.query()))
    .map(pluck("show"))
    .map(map(toSearchViewModel))
    .map(rejectWithAttr("image")(null))
    .map(updateShowStatus(mdl.user.shows))

const itemSelected = (mdl) => (result) =>
  equals(prop("tvmazeId", result), mdl.state.searchItem.showMenu())

export const propIsDefined = (attr) => compose(not, propEq(attr, undefined))

export const showListSelection = (mdl) =>
  anyPass([itemSelected(mdl), propIsDefined("objectId")])

const updateListStatus = (show) => (listType) =>
  over(lensProp("listStatus"), () => listType, show)

const createBody = (mdl) => (dto) => ({
  body: toDbModel(mdl.user.data.objectId)(dto),
})

const updateOrder = (mdl) => (show) => {
  show.order = filter(
    propEq("listStatus", show.listStatus),
    mdl.user.shows
  ).length
  return show
}

export const toDto = (mdl, show, listType) =>
  compose(createBody(mdl), updateOrder(mdl), updateListStatus(show))(listType)

const linkUserToShowTask = (mdl) => (http) => (show) =>
  http.postTask(
    http.backendlessUrl(
      `data/Users/${mdl.user.data.objectId}/shows%3A${mdl.db}%3A1`
    ),
    { body: [show.objectId] }
  )

export const addUserShowsTask = (mdl) => (http) => (show) => (list) =>
  http
    .postTask(http.backendlessUrl(`data/${mdl.db}`), toDto(mdl, show, list))
    .chain(linkUserToShowTask(mdl)(http))
    .chain((_) => getShows(mdl)(http))

export const updateUserShowsTask = (mdl) => (http) => (show) => (list) =>
  http
    .putTask(
      http.backendlessUrl(`data/${mdl.db}\\${show.objectId}`),
      toDto(mdl, show, list)
    )
    .chain((_) => getShows(mdl)(http))

export const deleteShowTask = (mdl) => (http) => (id) =>
  http
    .deleteTask(http.backendlessUrl(`data/${mdl.db}/${id}`))
    .chain((_) => getShows(mdl)(http))

export const updateShowDetailsTask = (mdl) => (http) => (dto) =>
  http
    .putTask(
      http.backendlessUrl(
        `data/${mdl.db}/${mdl.state.details.selected().objectId}`
      ),
      {
        body: dto,
      }
    )
    .chain(({ objectId }) => getShowDetailsTask(mdl)(http)(objectId))

export const getShowTvMazeDetailsTask = (http) => (show) =>
  http
    .getTask(http.tvMazeDetailsUrl(show.tvmazeId))
    .map(toDetailsViewModel(show))

const findShowInDbTask = (mdl) => (http) => (id) =>
  http.getTask(http.backendlessUrl(`data/${mdl.db}/${id}`))

export const getShowDetailsTask = (mdl) => (http) => (id) =>
  findShowInDbTask(mdl)(http)(id).chain(getShowTvMazeDetailsTask(http))

export const filterShowsByListType = (mdl) =>
  filter(propEq("listStatus", mdl.state.currentList()), mdl.user.shows)

export const filterShowForUnselected = (mdl) => {
  let selected = pluck("tvmazeId", mdl.user.shows)
  return mdl.data.shows().filter((show) => !selected.includes(show.tvmazeId))
}

export const getEpisodeTask = (http) => (episodeUrl) =>
  http.getTask(episodeUrl).map(toEpisodeViewModel)

export const registerUserTask = (http) => ({ name, email, password }) =>
  http.postTask(http.backendlessUrl("users/register"), {
    body: {
      name,
      email,
      password: btoa(password),
    },
  })

export const loginUserTask = (http) => ({ email, password }) =>
  http.postTask(http.backendlessUrl("users/login"), {
    body: {
      login: email,
      password: btoa(password),
    },
  })
