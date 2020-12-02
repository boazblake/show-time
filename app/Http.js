import { tvMazeApiKey, tvMazeBaseUrl } from "./.secrets.js"
import Task from "data.task"
import Model from "./Models.js"

function onProgress(e) {
  if (e.lengthComputable) {
    // console.log("onprogress", e.total, e.loaded)
    Model.state.loadingProgress.max(e.total)
    Model.state.loadingProgress.value(e.loaded)
    m.redraw()
  }
}

function onLoad() {
  return false
}

function onLoadStart() {
  Model.state.isLoading(true)
  return false
}
function onLoadEnd() {
  Model.state.isLoading(false)
  Model.state.loadingProgress.max(0)
  Model.state.loadingProgress.value(0)
  return false
}

const xhrProgress = {
  config: (xhr) => {
    // console.log(xhr)
    xhr.onprogress = onProgress
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart
    xhr.onloadend = onLoadEnd
  },
}

const _http = (mdl) => {
  mdl.state.isLoading(!mdl.state.isLoading)
  return m.request
}

const headers = (url, args) => {
  // let tmdbBearerToken = url.includes("themoviedb") && tmdbAuth
  let contentType =
    { "Content-Type": "application/json;charset=utf-8" } &&
    ["Get", "POST", "PUT", "PATCH"].includes(args.method)
  return {
    headers: {
      // ...tmdbBearerToken,
      ...contentType,
    },
  }
}

const _task = (url) => (args) =>
  new Task((rej, res) =>
    _http(Model)(url, { ...args, ...headers(url, args), ...xhrProgress }).then(
      res,
      rej
    )
  )

const getTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "GET",
  })
const postTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "POST",
  })
const putTask = (url, args = {}) => {
  // console.log(args)
  return _task(url)({
    ...args,
    method: "PUT",
  })
}
const deleteTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "DELETE",
  })

const backEndlessBaseUrl =
  "https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/"

const tvMazeSearchUrl = (baseUrl) => (query) =>
  `${baseUrl}/search/shows?q=${query}`

const tvMazeShowByIdUrl = (baseUrl) => (id) => `${baseUrl}/shows/${id}`

const backendlessUrl = (url) => backEndlessBaseUrl + url

const searchUrl = (query) => tvMazeSearchUrl(tvMazeBaseUrl)(query)
const tvMazeDetailsUrl = (id) => tvMazeShowByIdUrl(tvMazeBaseUrl)(id)

const http = {
  getTask,
  postTask,
  putTask,
  deleteTask,
  searchUrl,
  tvMazeDetailsUrl,
  backendlessUrl,
}

export default http
