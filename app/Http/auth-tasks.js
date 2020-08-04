import { mergeDeepWith, add } from "ramda"

const setUserToken = (mdl) => (user) => {
  sessionStorage.setItem("shindigit-user", JSON.stringify(user))
  sessionStorage.setItem("shindigit-user-token", user["user-token"])
  mdl.state.isAuth(true)
  mdl.user = user
  return user
}

export const loginTask = (http) => (mdl) => ({ email, password }) =>
  http.backEnd
    .postTask(mdl)("users/login")({
      login: email,
      password: password,
    })
    .map(setUserToken(mdl))

export const registerUserTask = (http) => (mdl) => ({
  name,
  email,
  password,
  isAdmin,
}) =>
  HTTP.backEnd.postTask(mdl)("users/register")({
    name,
    email,
    password,
    isAdmin,
  })
