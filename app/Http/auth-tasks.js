export const setUserToken = (mdl) => (user) => {
  sessionStorage.setItem("shindigit-user", JSON.stringify(user))
  sessionStorage.setItem("shindigit-user-token", user["user-token"])
  mdl.State.isAuth(true)
  mdl.User = user
  return user
}

export const loginTask = (http) => (mdl) => ({ email, password }) =>
  http.backEnd
    .postTask(mdl)("users/login")({
      login: email,
      password: password,
    })
    .map(setUserToken(mdl))

export const registerTask = (http) => (mdl) => ({
  name,
  email,
  password,
  isAdmin,
}) =>
  http.backEnd.postTask(mdl)("users/register")({
    name,
    email,
    password,
    isAdmin,
  })

export const createProfileTask = (http) => (mdl) =>
  http.backEnd.postTask(mdl)("data/Profiles")({
    userId: mdl.User.objectId,
  })

export const linkProfileTask = (http) => (mdl) =>
  http.backEnd.postTask(mdl)(
    `data/Users/${mdl.User.objectId}/profile%3AProfiles%3A1`
  )([mdl.User.profile.objectId])

export const getUserProfileTask = (http) => (mdl) =>
  http.backEnd.getTask(mdl)(
    `data/Profiles?where=userId%3D'${mdl.User.objectId}'`
  )

export const updateUserProfile = (http) => (mdl) => (profile) =>
  http.backEnd.putTask(mdl)(`data/Profiles/${mdl.User.profile.objectId}`)(
    profile
  )
