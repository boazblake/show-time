import { Calendar, Day } from "Components"
import { HTTP, fetchInvitesTask } from "Http"
import { dayModel } from "Models"
import { calendarModel } from "Components/calendar/model"
import { shortDateString, datesAreSame } from "Utils"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.hour}:00`].push(invite)
  return dayViewModel
}

const getTodaysInvites = (mdl) => (invites) =>
  invites
    .filter((i) => datesAreSame(i.startTime)(shortDateString(mdl.selectedDate)))
    .reduce(toDayViewModel, dayModel(mdl, mdl.currentShortDate()))

export const Home = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    status: "loading",
    invites: null,
    events: null,
  }

  const onError = (err) => {
    state.error = err
    state.status = "failed"
  }

  const onSuccess = (invites) => {
    mdl.reloadInvites(false)
    state.invites = invites
    state.error = null
    state.status = "success"
  }

  const load = ({ attrs: { mdl } }) => {
    fetchInvitesTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    onupdate: ({ attrs: { mdl } }) =>
      mdl.reloadInvites() && load({ attrs: { mdl } }),
    view: ({ attrs: { mdl } }) => {
      return m(
        ".frow",
        state.status == "loading" && m("p", "FETCHING EVENTS..."),
        state.status == "failed" && m("p", "FAILED TO FETCH EVENTS"),
        state.status == "success" && [
          m(Calendar, {
            mdl,
            calendar: calendarModel({
              invites: state.invites,
              date: mdl.currentShortDate(),
            }),
            invites: state.invites,
          }),
          m(Day, {
            mdl,
            invites: getTodaysInvites(mdl)(state.invites),
          }),
        ]
      )
    },
  }
}
