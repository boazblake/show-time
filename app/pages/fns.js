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
  set,sortBy,
  view,
} from "ramda"

export const log = m => v => {
  console.log(m, v)
  return v
}

const resetToast = mdl => {
  mdl.toast.show(false)
  mdl.toast.msg(null)
  mdl.toast.status(null)

}

export const makeToast = ({ mdl, status, msg }) => {
  mdl.toast.show(true)
  mdl.toast.status(status)
  mdl.toast.msg(msg)
  setTimeout(() => resetToast(mdl),  mdl.toast.duration()  )
}

export const formatError = error => JSON.parse(JSON.stringify(error))

 const getEpisodeLink = label => path => links =>
  ({label, href: makeHttps(view(lensPath([path, "href"]), links))})

const formatDetailsLinks = links => [
      getEpisodeLink('previous')("previousepisode")(links),
      getEpisodeLink('next')("nextepisode")(links)
    ].filter(ep => !propEq('href', undefined)(ep))

const formatEpisodeLinks = links => [
      getEpisodeLink('self')('self')(links)
    ].filter(ep => !propEq('href', undefined)(ep))



const toEpisodeViewModel = ({
  name,
  season,
  number,
  airdate,
  image,
  _links
}) => ({
  name,
  season,
  number,
  airdate,
  image: image && (makeHttps(image.original) || makeHttps(image.medium)),
  links: formatEpisodeLinks(_links)
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
  _links
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
  status
})

const makeHttps = url => url && url.replace("http", "https")

export const toSearchViewModel = ({ name, image, id }) => ({
  image: image && (makeHttps(image.original) || makeHttps(image.medium)),
  tvmazeId: id,
  name
})

export const toDbModel = ({ listStatus, notes, name, tvmazeId, image, status }) => ({
  image,
  listStatus,
  notes,
  name,
  tvmazeId,
  status
})

export const onError = mdl => type => error => mdl.errors[type](error)

const rejectWithAttr = attr => value => reject(propEq(attr, value))

const updateResults = result => show => {
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

export const updateShowStatus = shows => data =>
  data.map(r =>
    compose(
      updateResults(r),
      find(propEq("tvmazeId", r.tvmazeId))
    )(shows)
  )

export const getShows = http =>
  http.getTask(http.backendlessUrl("prodshows?pagesize=100")).map(sortBy(propEq('name')))

export const searchShowsTask = mdl => http =>
  http
    .getTask(http.searchUrl(mdl.state.query()))
    .map(pluck("show"))
    .map(map(toSearchViewModel))
    .map(rejectWithAttr("image")(null))
    .map(updateShowStatus(mdl.user.shows()))

const itemSelected = mdl => result =>
  equals(prop("tvmazeId", result), mdl.state.searchItem.showMenu())

export const propIsDefined = attr =>
  compose(
    not,
    propEq(attr, undefined)
  )

export const showListSelection = mdl =>
  anyPass([itemSelected(mdl), propIsDefined("objectId")])

const updateListStatus = show => listType =>
  over(lensProp("listStatus"), () => listType, show)

const createBody = dto => ({
  body: toDbModel(dto)
})

const updateOrder = mdl => show => {
  show.order = filter(
    propEq("listStatus", show.listStatus),
    mdl.user.shows()
  ).length
  return show
}

export const toDto = (mdl, show, listType) =>
  compose(
    createBody,
    updateOrder(mdl),
    updateListStatus(show)
  )(listType)

export const addUserShowsTask = mdl => http => show => list =>   http
  .postTask(http.backendlessUrl("prodshows"), toDto(mdl, show, list))
  .chain(_ => getShows(http))
  .map(mdl.user.shows)

export const updateUserShowsTask = mdl => http => show => list =>
  http
    .putTask(
      http.backendlessUrl(`prodshows\\${show.objectId}`),
      toDto(mdl, show, list)
    )
    .chain(_ => getShows(http))

export const deleteShowTask = http => id =>
  http
    .deleteTask(http.backendlessUrl(`prodshows/${id}`))
    .chain(_ => getShows(http))

export const updateShowDetailsTask = mdl => http => dto =>
  http
    .putTask(http.backendlessUrl(`prodshows/${mdl.state.details.selected().objectId}`), {
      body: dto
    })
    .chain(({ objectId }) => getShowDetailsTask(http)(objectId))

export const getShowTvMazeDetailsTask = http => show =>
  http
    .getTask(http.tvMazeDetailsUrl(show.tvmazeId))
    .map(toDetailsViewModel(show))

const findShowInDbTask = http => id =>
  http.getTask(http.backendlessUrl(`prodshows/${id}`))

export const getShowDetailsTask =  http => id =>
  findShowInDbTask(http)(id).chain(getShowTvMazeDetailsTask(http))

export const filterShowsByListType = mdl =>
  filter(propEq("listStatus", mdl.state.currentList()), mdl.user.shows())

export const filterShowForUnselected = mdl => {
  let selected = pluck('tvmazeId',mdl.user.shows())
  return mdl.data.shows().filter(show=> !selected.includes(show.tvmazeId))
}

export const getEpisodeTask = http => episodeUrl =>
  http.getTask(episodeUrl).map(toEpisodeViewModel)
