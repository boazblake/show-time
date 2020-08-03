import { Calendar, Day } from "Components"
import { isToday, HTTP, fromFullDate } from "Utils"
import { dayModel } from "Models"
import { map } from "ramda"
import { calendarModel } from "Components/calendar/model"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.hour}:00`].push(invite)
  console.log("ddd", dayViewModel)
  return dayViewModel
}

const toInviteViewModel = ({
  startTime,
  endTime,
  title,
  objectId,
  eventId,
  status,
}) => ({
  startTime,
  endTime,
  start: fromFullDate(startTime),
  end: fromFullDate(endTime),
  inviteId: objectId,
  eventId,
  title,
  status,
})

export const Home = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    status: "loading",
    invites: null,
    events: null,
  }

  const loadTask = (http) => (mdl) =>
    http.backEnd
      .getTask(mdl)(`data/Invites?where=userId%3D'${mdl.user.objectId}'`)
      .map(map(toInviteViewModel))

  const onError = (err) => {
    state.error = err
    state.status = "failed"
  }

  const onSuccess = (invites) => {
    state.invites = invites
    state.todaysInvites = invites
      .filter((i) => isToday(i.startTime))
      .reduce(toDayViewModel, dayModel(mdl, mdl.currentShortDate()))
    console.log("home succes", state.invites, mdl)
    state.error = null
    state.status = "success"
  }

  const load = ({ attrs: { mdl } }) => {
    // console.log("loading")
    loadTask(HTTP)(mdl).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    view: ({ attrs: { mdl } }) => {
      return m(".frow", [
        m(Calendar, {
          mdl,
          calendar: calendarModel(state.invites),
          invites: state.invites,
        }),
        state.status == "loading" && m("p", "FETCHING EVENTS..."),
        state.status == "failed" && m("p", "FAILED TO FETCH EVENTS"),
        state.status == "success" &&
          m(Day, {
            mdl,
            invites: state.todaysInvites,
          }),
      ])
    },
  }
}
