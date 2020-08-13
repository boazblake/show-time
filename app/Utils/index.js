export * from "./local-storage.js"
export * from "./validations"
export * from "./time-fns.js"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

export const stackInvites = (idx) => {
  let bIdx = 140
  let lIdx = -5
  let bottom = idx * 140 + bIdx
  let left = idx * 3 + lIdx
  return {
    style: {
      left: `${left}px`,
      bottom: `${bottom}px`,
    },
  }
}

export const debounce = (wait) => (func, immediate) => {
  console.log(wait)
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const inviteOptions = ["decline", "accept", "maybe"]

export const getInviteStatusColor = (status) =>
  getComputedStyle(document.body).getPropertyValue(
    `--${inviteOptions[status]}-invite`
  )

export const hyphenize = (strWithSpaces) => strWithSpaces.replace(/\s/g, "-")

const secureImg = (url) =>
  url.match(/(https)./) ? url : url.replace("http", "https")

export const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

export const randomPause = () => Math.random() * 1000
export const Pause = (n) => n * 1000
export const NoOp = () => {}
export const nameFromRoute = (route) => route.split("/")[1].toUpperCase()

export const jsonCopy = (data) => JSON.parse(JSON.stringify(data))

export const isSideBarActive = (mdl) =>
  mdl.settings.profile !== "desktop" && mdl.status.sidebar

export const range = (size) => [...Array(size).keys()]

export const isEqual = (a, b) => JSON.stringify(a) == JSON.stringify(b)
