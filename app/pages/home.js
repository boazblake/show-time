import { Calendar, Day, Editor } from "Components"
import { dayModel } from "Models"
import { datesAreSame } from "Utils"
import {
  AnimatePage,
  fadeInUp,
  fadeInDown,
  fadeOutUp,
  fadeOutDown,
  fadeIn,
  fadeOut,
} from "Styles"

const toDayViewModel = (dayViewModel, invite) => {
  dayViewModel[`${invite.start.format("HH")}:00`].push(invite)
  return dayViewModel
}

const createDayVM = (mdl) => (invites) =>
  invites.reduce(toDayViewModel, dayModel(mdl, mdl.selectedDate()))

const getSelectedDayInvites = (mdl) => (invites) =>
  invites.filter((i) => datesAreSame(i.start)(mdl.selectedDate())("YYYY-MM-DD"))

export const Home = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".frow  ",
        mdl.Invites.state.status == "loading" &&
          m("p.full-width", "FETCHING EVENTS..."),
        mdl.Invites.state.status == "failed" &&
          m("p.full-width", "FAILED TO FETCH EVENTS"),
        mdl.Invites.state.status == "success" && [
          m(Calendar, {
            mdl,
            date: mdl.selectedDate(),
            invites: mdl.Invites.withRSVP(),
          }),

          m(`.frow.max-width`, [
            m(
              `${mdl.Events.createNewEvent() ? ".col-xs-1-1" : ".col-xs-2-3"}`,
              m(
                `button.btn.max-width.height-100`,
                {
                  oncreate: AnimatePage(fadeIn),
                  onbeforeremove: AnimatePage(fadeOut),
                  onclick: (e) =>
                    mdl.Events.createNewEvent(!mdl.Events.createNewEvent()),
                },
                mdl.Events.createNewEvent() ? "Cancel" : "Create New Event"
              )
            ),
            !mdl.Events.createNewEvent() &&
              m(
                "col-xs-1-3",
                m(
                  "button.btn.max-width.height-100",
                  {
                    oncreate: AnimatePage(fadeIn),
                    onbeforeremove: AnimatePage(fadeOut),
                    onclick: (e) => mdl.Day.listView(!mdl.Day.listView()),
                  },
                  mdl.Day.listView() ? "Hour View" : "List View"
                )
              ),
          ]),

          mdl.Events.createNewEvent()
            ? m(Editor, {
                oncreate: AnimatePage(fadeInDown, { delay: 1 }),
                onbeforeremove: AnimatePage(fadeOutUp, { delay: 2 }),
                mdl,
              })
            : [
                m(Day, {
                  oncreate: AnimatePage(fadeInUp),
                  onbeforeremove: AnimatePage(fadeOutDown, { delay: 2 }),
                  mdl,
                  day: createDayVM(mdl)(
                    getSelectedDayInvites(mdl)(mdl.Invites.withRSVP())
                  ),
                  invites: getSelectedDayInvites(mdl)(mdl.Invites.withRSVP()),
                }),
              ],
        ]
      )
    },
  }
}
