import { Editor, InvitesList } from "Components"
import { getHoursInDay } from "Utils"

export const Hour = () => {
  return {
    view: ({ attrs: { mdl, time, events } }) => {
      return m(
        ".frow ",
        m(".hour ", [
          m("p.hour-time", { id: time }, time),
          [
            m(InvitesList, { mdl, events }),
            m(".half-hour", m(".top")),
            m(".half-hour", m(".bottom")),
          ],
        ])
      )
    },
  }
}

export const Day = ({ attrs: { mdl } }) => {
  return {
    oncreate: () => {
      let time = M().format("HH")

      if (mdl.State.toAnchor()) {
        time = mdl.State.toAnchor().split(":")[0]
      }

      let el = document.getElementById(`${time}:00`)
      el.scrollIntoView()
    },
    view: ({ attrs: { mdl, invites } }) => {
      return m(
        ".day",
        m(".frow-container", [
          m(
            `.${mdl.State.modal() ? "bg-warn" : "bg-info"}`,
            m(
              "button.frow.width-100",
              {
                onclick: (e) => mdl.State.modal(!mdl.State.modal()),
              },
              mdl.State.modal() ? "Cancel" : "Add Event"
            )
          ),
          m(".day-container", [
            mdl.State.modal() && m(Editor, { mdl }),
            getHoursInDay(mdl.State.timeFormats[mdl.State.format()]).map(
              (hour, idx) => {
                return m(Hour, {
                  mdl,
                  hour: invites[hour],
                  time: hour,
                  events: invites[hour],
                })
              }
            ),
          ]),
        ])
      )
    },
  }
}
