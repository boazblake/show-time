import { setUserToken, updateUserProfile, HTTP } from "Http"
import { daysOfTheWeek, getBoundsFromLatLong } from "Utils"

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
      // console.log(mdl)
      return m(".profile-section", [
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
        m("hr"),
        m(
          "label",
          "Start Week on Day:",
          m(
            ".frow row-between",
            daysOfTheWeek.map((day, idx) =>
              m(
                "label.col-xs-1-7",
                m(
                  "span",
                  {
                    key: idx,
                  },
                  day.slice(0, 3)
                ),
                m("input", {
                  key: idx,
                  id: idx,
                  name: `startDay-${idx}`,
                  type: "radio",
                  value: mdl.User.profile.startWeekOnDay,
                  checked: mdl.User.profile.startWeekOnDay == idx,
                  onchange: (e) => {
                    console.log(mdl.User)
                    mdl.User.profile.startWeekOnDay = idx
                    mdl.Calendar.state.start(idx)
                    updatePrefs(mdl)
                  },
                })
              )
            )
          )
        ),
        m("hr"),
        m(
          "label",
          `Search Range Radius: ${mdl.User.profile.searchRadius}`,
          m("input", {
            type: "range",
            value: mdl.User.profile.searchRadius,
            min: 0,
            max: 100,
            onchange: (e) => {
              mdl.User.profile.searchRadius = parseInt(e.target.value)
              mdl.Map.bounds(getBoundsFromLatLong(mdl)(mdl.Map.locale()))
              console.log(JSON.stringify(mdl.Map))
              updatePrefs(mdl)
            },
          })
        ),
      ])
    },
  }
}
