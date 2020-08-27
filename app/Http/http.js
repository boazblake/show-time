import Task from "data.task"
import { BackEnd, OpenCage } from "../.secrets.js"

const onProgress = (mdl) => (e) => {
  if (e.lengthComputable) {
    mdl.State.loadingProgress.max = e.total
    mdl.State.loadingProgress.value = e.loaded
    m.redraw()
  }
}

function onLoad() {
  return false
}

const onLoadStart = (mdl) => (e) => {
  mdl.State.isLoading(true)
  return false
}

const onLoadEnd = (mdl) => (e) => {
  mdl.State.isLoading(false)
  mdl.State.loadingProgress.max = 0
  mdl.State.loadingProgress.value = 0
  return false
}

const xhrProgress = (mdl) => ({
  config: (xhr) => {
    xhr.onprogress = onProgress(mdl)
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart(mdl)
    xhr.onloadend = onLoadEnd(mdl)
  },
})

export const parseHttpError = (mdl) => (rej) => (e) => {
  mdl.State.isLoading(false)
  console.error(e)
  e.response && e.response.code == 3064 && m.route.set("/logout")
  return rej(e.response)
}

export const parseHttpSuccess = (mdl) => (res) => (data) => {
  mdl.State.isLoading(false)
  return res(data)
}

const HttpTask = (_headers) => (method) => (mdl) => (url) => (body) => {
  // mdl.State.isLoading(true)
  return new Task((rej, res) =>
    m
      .request({
        method,
        url,
        headers: {
          ..._headers,
        },
        body,
        withCredentials: false,
        ...xhrProgress(mdl),
      })
      .then(parseHttpSuccess(mdl)(res), parseHttpError(mdl)(rej))
  )
}

const backEndUrl = `${BackEnd.baseUrl}/${BackEnd.APP_ID}/${BackEnd.API_KEY}/`
const OpenCageUrl = `${OpenCage.baseUrl}?key=${OpenCage.key}&q=`

const openCage = {
  getLocationTask: (mdl) => (query) =>
    HttpTask(OpenCage.headers())("GET")(mdl)(
      OpenCageUrl +
        query +
        `&pretty=1&json&language=${
          mdl.User.profile.language
        }&bounds=${mdl.Map.bounds()}`
    )(null),
}

const backEnd = {
  getTask: (mdl) => (url) =>
    HttpTask(BackEnd.headers())("GET")(mdl)(backEndUrl + url)(null),
  postTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("POST")(mdl)(backEndUrl + url)(dto),
  putTask: (mdl) => (url) => (dto) =>
    HttpTask(BackEnd.headers())("PUT")(mdl)(backEndUrl + url)(dto),
  deleteTask: (mdl) => (url) =>
    HttpTask(BackEnd.headers())("DELETE")(mdl)(backEndUrl + url)(null),
}

export const HTTP = {
  openCage,
  backEnd,
  HttpTask,
}
