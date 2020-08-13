import { Calendar, Day, Editor, InvitesToast } from "Components"
import { HTTP, getInvitesByUserIdTask } from "Http"
import { dayModel } from "Models"
import { datesAreSame, stackInvites } from "Utils"
import { without } from "ramda"

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
    invitesToast: Stream([]),
    events: null,
    invitesWithRSVP: null,
  }

  const load = ({ attrs: { mdl } }) => {
    mdl.Home.modal(false)
    const onError = (err) => {
      state.error = err
      state.status = "failed"
    }

    const onSuccess = (invites) => {
      mdl.Home.fetch(false)

      mdl.State.invitesToast(
        without(
          mdl.State.notifications().invites,
          invites.filter((i) => !i.updated && i.status == 2)
        )
      )
      state.invitesWithRSVP = invites.filter((i) => i.updated || i.status !== 2)
      // console.log(state)
      state.error = null
      state.status = "success"
    }

    getInvitesByUserIdTask(HTTP)(mdl)(mdl.User.objectId).fork(
      onError,
      onSuccess
    )
  }

  return {
    oninit: load,
    onupdate: ({ attrs: { mdl } }) =>
      mdl.Home.fetch() && load({ attrs: { mdl } }),
    view: ({ attrs: { mdl } }) => {
      return m(
        ".frow  ",
        state.status == "loading" && m("p.full-width", "FETCHING EVENTS..."),
        state.status == "failed" && m("p.full-width", "FAILED TO FETCH EVENTS"),
        state.status == "success" && [
          m(Calendar, {
            mdl,
            date: mdl.selectedDate(),
            invites: state.invitesWithRSVP,
          }),

          m(`.frow.max-width`, [
            m(
              `${mdl.Home.modal() ? ".col-xs-1-1" : ".col-xs-2-3"}`,
              m(
                `button.btn.max-width.height-100`,
                {
                  onclick: (e) => mdl.Home.modal(!mdl.Home.modal()),
                },
                mdl.Home.modal() ? "Cancel" : "Add Event"
              )
            ),
            !mdl.Home.modal() &&
              m(
                "col-xs-1-3",
                m(
                  "button.btn.max-width.height-100",
                  {
                    onclick: (e) => mdl.Day.listView(!mdl.Day.listView()),
                  },
                  mdl.Day.listView() ? "Hour View" : "List View"
                )
              ),
          ]),

          mdl.Home.modal()
            ? m(Editor, { mdl })
            : [
                m(Day, {
                  mdl,
                  day: createDayVM(mdl)(
                    getSelectedDayInvites(mdl)(state.invitesWithRSVP)
                  ),
                  invites: getSelectedDayInvites(mdl)(state.invitesWithRSVP),
                }),

                mdl.State.invitesToast().any() &&
                  m(InvitesToast, {
                    invites: mdl.State.invitesToast(),
                    style: stackInvites,
                    mdl,
                  }),
              ],
        ]
      )
    },
  }
}
