import Task from "data.task"
import { BackEnd } from "../.secrets.js"

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
  return rej(e.response)
}

export const parseHttpSuccess = (mdl) => (res) => (data) => {
  mdl.State.isLoading(false)
  return res(data)
}

// const getUserToken = () =>
//   window.sessionStorage.getItem("user-token")
//     ? window.sessionStorage.getItem("user-token")
//     : ""

const HttpTask = (_headers) => (method) => (mdl) => (url) => (body) => {
  mdl.State.isLoading(true)
  return new Task((rej, res) =>
    m
      .request({
        method,
        url,
        headers: {
          "content-type": "application/json",
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
  backEnd,
  HttpTask,
}
