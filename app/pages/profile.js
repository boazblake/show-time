import { setUserToken, updateUserProfile, HTTP } from "Http"

export const Profile = () => {
  const state = {
    errors: null,
    status: "loading",
  }

  const updatePrefs = (mdl) => {
    const onError = (err) => {
      state.error = err
      state.status = "failed"
    }

    const onSuccess = (profile) => {
      mdl.User.profile = profile
      state.error = null
      state.status = "success"
      setUserToken(mdl)(mdl.User)
    }

    updateUserProfile(HTTP)(mdl)(mdl.User.profile).fork(onError, onSuccess)
  }

  return {
    view: ({ attrs: { mdl } }) => {
      console.log(mdl)
      return m(".profile", [
        m("h1", "Profile Page"),
        m(
          "label",
          "Use 24 Hrs",
          m("input", {
            type: "checkbox",
            checked: mdl.User.profile.is24Hrs,
            onclick: (e) => {
              mdl.User.profile.is24Hrs = !mdl.User.profile.is24Hrs
              updatePrefs(mdl)
            },
          })
        ),
      ])
    },
  }
}
