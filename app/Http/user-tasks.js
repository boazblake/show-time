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
    name: mdl.User.name,
    email: mdl.User.email,
    startWeekOnDay: 1,
    use24Hrs: true,
    isDarkTheme: true,
    language: "en",
    searchRadius: 20,
  })

export const getUserProfileTask = (http) => (mdl) => (id) =>
  http.backEnd.getTask(mdl)(`data/Profiles?where=userId%3D'${id}'`)

export const updateUserProfile = (http) => (mdl) => (profile) =>
  http.backEnd.putTask(mdl)(`data/Profiles/${mdl.User.profile.objectId}`)(
    profile
  )

export const findUserByEmailTask = (http) => (mdl) => (email) =>
  http.backEnd.getTask(mdl)(`data/Users?where=email%3D'${email}'`)

export const relateItemsToUserTask = (http) => (mdl) => (userId) => (itemIds) =>
  http.backEnd.putTask(mdl)(`data/Users/${userId}/items`)(itemIds)

export const unRelateItemToUserTask = (http) => (mdl) => (userId) => (itemId) =>
  http.backEnd.deleteTask(mdl)(
    `data/Users/${userId}/items:Users?where=objectId%3D'${itemId}'`
  )

export const relateInvitesToUserTask = (http) => (mdl) => (userId) => (
  inviteIds
) => http.backEnd.putTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)

// export const unRelateInvitesToUserTask = (http) => (mdl) => (userId) => (
//   inviteIds
// ) => http.backEnd.deleteTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)

export const relateProfileToUserTask = (http) => (mdl) => (userId) => (
  profileId
) => http.backEnd.putTask(mdl)(`data/Users/${userId}/profile`)([profileId])

// export const unRelateProfileToUserTask = (http) => (mdl) => (userId) => (
//   profileId
// ) => http.backEnd.deleteTask(mdl)(`data/Users/${userId}/profile`)([profileId])
