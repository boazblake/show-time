import { Calendar, Day } from "Components"
import { HTTP, getInvitesTask } from "Http"
import { dayModel } from "Models"
import { datesAreSame } from "Utils"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.format("HH")}:00`].push(invite)
  return dayViewModel
}

const getSelectedDayInvites = (mdl) => (invites) =>
  invites
    .filter((i) => datesAreSame(i.start)(mdl.selectedDate())("YYYY-MM-DD"))
    .reduce(toDayViewModel, dayModel(mdl, mdl.selectedDate()))

export const Home = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    status: "loading",
    invites: null,
    events: null,
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (err) => {
      state.error = err
      state.status = "failed"
    }

    const onSuccess = (invites) => {
      mdl.Invites.fetch(false)
      state.invites = invites
      state.error = null
      state.status = "success"
    }

    getInvitesTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    onupdate: ({ attrs: { mdl } }) =>
      mdl.Invites.fetch() && load({ attrs: { mdl } }),
    view: ({ attrs: { mdl } }) => {
      return m(
        ".frow",
        state.status == "loading" && m("p", "FETCHING EVENTS..."),
        state.status == "failed" && m("p", "FAILED TO FETCH EVENTS"),
        state.status == "success" && [
          m(Calendar, {
            mdl,
            date: mdl.selectedDate(),
            invites: state.invites,
          }),
          m(Day, {
            mdl,
            invites: getSelectedDayInvites(mdl)(state.invites),
          }),
        ]
      )
    },
  }
}
