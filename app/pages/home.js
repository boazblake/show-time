import { Calendar, Day } from "Components"
import { HTTP, fromFullDate } from "Utils"
import { dayModel } from "Models"
import { map } from "ramda"
import { calendarModel } from "Components/calendar/model"
import { shortDateString, datesAreSame } from "Utils"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.hour}:00`].push(invite)
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

  const getTodays = (invites) =>
    invites
      .filter((i) =>
        datesAreSame(i.startTime)(shortDateString(mdl.selectedDate))
      )
      .reduce(toDayViewModel, dayModel(mdl, mdl.currentShortDate()))

  const loadTask = (http) => (mdl) =>
    http.backEnd
      .getTask(mdl)(`data/Invites?where=userId%3D'${mdl.user.objectId}'`)
      .map(map(toInviteViewModel))

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
    loadTask(HTTP)(mdl).fork(onError, onSuccess)
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
            invites: getTodays(state.invites),
          }),
        ]
      )
    },
  }
}
