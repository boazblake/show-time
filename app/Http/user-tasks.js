import { prop, map } from "ramda"

const setUser = (mdl) => (user) => {
  mdl.User = user
  return mdl
}

const setProfile = (mdl) => (profile) => {
  mdl.User.profile = profile
  return mdl
}

export const loginTask = (http) => (mdl) => ({ email, password }) =>
  http.back4App
    .postTask(mdl)("login")({
      username: email,
      password: password,
    })
    .map(setUser(mdl))

export const registerTask = (http) => (mdl) => ({
  name,
  email,
  password,
  isAdmin,
}) =>
  http.back4App.postTask(mdl)("users")({
    username: email,
    name,
    email,
    password,
    isAdmin,
  })

export const createProfileTask = (http) => (mdl) => ({ name, email }) => ({
  objectId,
}) =>
  http.back4App.postTask(mdl)("classes/Profile")({
    userId: objectId,
    name,
    email,
    startWeekOnDay: 1,
    is24Hrs: true,
    isDarkTheme: true,
    language: "en",
    searchRadius: 20,
  })

export const getUserProfileTask = (http) => (mdl) => (id) =>
  http.back4App
    .getTask(mdl)(`classes/Profile?where=${JSON.stringify({ userId: id })}`)
    .map(prop("results"))
    .map(map(setProfile(mdl)))

export const updateUserProfile = (http) => (mdl) => (profile) =>
  http.back4App.putTask(mdl)(`classes/Profiles/${mdl.User.profile.objectId}`)(
    profile
  )

export const findUserByEmailTask = (http) => (mdl) => (email) =>
  http.back4App.getTask(mdl)(`data/Users?where=email%3D'${email}'`)

export const relateItemsToUserTask = (http) => (mdl) => (userId) => (itemIds) =>
  http.back4App.putTask(mdl)(`data/Users/${userId}/items`)(itemIds)

export const unRelateItemToUserTask = (http) => (mdl) => (userId) => (itemId) =>
  http.back4App.deleteTask(mdl)(
    `data/Users/${userId}/items?whereClause=objectId%3D'${itemId}'`
  )

export const relateInvitesToUserTask = (http) => (mdl) => (userId) => (
  inviteIds
) => http.back4App.putTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)

// export const unRelateInvitesToUserTask = (http) => (mdl) => (userId) => (
//   inviteIds
// ) => http.back4App.deleteTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)

export const relateProfileToUserTask = (http) => (mdl) => (userId) => (
  profileId
) => http.back4App.putTask(mdl)(`data/Users/${userId}/profile`)([profileId])

// export const unRelateProfileToUserTask = (http) => (mdl) => (userId) => (
//   profileId
// ) => http.back4App.deleteTask(mdl)(`data/Users/${userId}/profile`)([profileId])
