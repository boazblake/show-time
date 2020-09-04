import Task from "data.task"

const newTaskFromPromise = (p) => new Task((res, rej) => p.then(res, rej))

export const locals = {
  getTask: (key) =>
    newTaskFromPromise(
      new Promise(
        (_, res) =>
          localStorage.getItem(key)
            ? res(JSON.parse(localStorage.getItem(key)))
            : res(null)
        // hack just for now
      )
    ),
  setTask: (key) => (value) =>
    newTaskFromPromise(
      new Promise((res) => res(localStorage.setItem(key, value)))
    ),
}

export const session = {
  getTask: (key) =>
    newTaskFromPromise(
      new Promise(
        (_, res) =>
          sessionStorage.getItem(key)
            ? res(JSON.parse(sessionStorage.getItem(key)))
            : res(null)
        // hack just for now
      )
    ),
  setTask: (key) => (value) =>
    newTaskFromPromise(
      new Promise((res) => res(sessionStorage.setItem(key, value)))
    ),
}

export const setUserToken = (sessionToken) =>
  sessionStorage.setItem("shindigit-user-session-token", sessionToken)

export const setUserSession = (user) =>
  sessionStorage.setItem("shindigit-user", JSON.stringify(user))

export const setSessionsTask = (mdl) => {
  setUserSession(mdl.User)
  setUserToken(mdl.User.sessionToken)
  return Task.of(mdl)
}
