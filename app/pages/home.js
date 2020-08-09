import { Calendar, Day, Editor } from "Components"
import { HTTP, getInvitesTask } from "Http"
import { dayModel } from "Models"
import { datesAreSame } from "Utils"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.format("HH")}:00`].push(invite)
  return dayViewModel
}

const createDayVM = (mdl) => (invites) =>
  invites.reduce(toDayViewModel, dayModel(mdl, mdl.selectedDate()))

const getSelectedDayInvites = (mdl) => (invites) =>
  invites.filter((i) => datesAreSame(i.start)(mdl.selectedDate())("YYYY-MM-DD"))

export const Home = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    status: "loading",
    invites: null,
    events: null,
  }

  const load = ({ attrs: { mdl } }) => {
    mdl.Home.modal(false)
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
        ".frow  ",
        state.status == "loading" && m(`.frow.max-width`, "FETCHING EVENTS..."),
        state.status == "failed" &&
          m(`.frow.max-width`, "FAILED TO FETCH EVENTS"),
        state.status == "success" && [
          m(Calendar, {
            mdl,
            date: mdl.selectedDate(),
            invites: state.invites,
          }),

          m(`.frow.max-width`, [
            m(
              `.${
                mdl.Home.modal() ? "bg-warn.col-xs-1-1." : "bg-info.col-xs-2-3"
              }`,
              m(
                `button.max-width`,
                {
                  onclick: (e) => mdl.Home.modal(!mdl.Home.modal()),
                },
                mdl.Home.modal() ? "Cancel" : "Add Event"
              )
            ),
            !mdl.Home.modal() &&
              m(
                `.col-xs-1-3.${mdl.Day.listView() ? "bg-warn" : "bg-info"}`,
                m(
                  `button.max-width`,
                  {
                    onclick: (e) => mdl.Day.listView(!mdl.Day.listView()),
                  },
                  mdl.Day.listView() ? "Hour View" : "List View"
                )
              ),
          ]),
          mdl.Home.modal()
            ? m(Editor, { mdl })
            : m(Day, {
                mdl,
                day: createDayVM(mdl)(
                  getSelectedDayInvites(mdl)(state.invites)
                ),
                invites: getSelectedDayInvites(mdl)(state.invites),
              }),
        ]
      )
    },
  }
}
