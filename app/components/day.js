import { Editor } from "Components"
import { log, getHoursInDay } from "Utils"
import { EventsList } from "Components"

export const Hour = () => {
  return {
    view: ({ attrs: { mdl, hour, time, events } }) => {
      return m(
        ".frow ",
        m(".hour ", [
          m("p.hour-time", { id: time }, time),
          [
            m(EventsList, { mdl, events }),
            m(".half-hour", m(".top")),
            m(".half-hour", m(".bottom")),
          ],
        ])
      )
    },
  }
}

export const Day = ({ attrs: { mdl } }) => {
  const state = {
    error: null,
    data: null,
    status: "loading",
  }

  let _dom

  const planDay = (mdl) => ({ dom }) => {
    // _dom = dom
    console.log("create day")
    if (mdl.toAnchor()) {
      console.log(
        "anchor",
        mdl.toAnchor(),
        dom,
        dom.querySelector(`${mdl.toAnchor().toString()}`)
      )

      let el = document.getElementById(mdl.toAnchor())

      console.log("el", el)
    }
    mdl.updateDay(false)
  }

  return {
    // oninit: load,
    // oncreate: ({ attrs: { mdl } }) => planDay(mdl),
    // onupdate: ({ attrs: { mdl } }) =>
    //   mdl.updateDay() && planDay(mdl)({ dom: _dom }),
    view: ({ attrs: { mdl, invites } }) => {
      return m(
        ".day",
        m(".frow-container", [
          m(
            `.${mdl.state.modal() ? "bg-warn" : "bg-info"}`,
            m(
              "button.frow.width-100",
              {
                onclick: (e) => mdl.state.modal(!mdl.state.modal()),
              },
              mdl.state.modal() ? "Cancel" : "Add Event"
            )
          ),
          m(".day-container", [
            mdl.state.modal() && m(Editor, { mdl }),
            getHoursInDay(mdl.timeFormats[mdl.format()]).map((hour, idx) => {
              // console.log("day", invites[hour])
              return m(Hour, {
                mdl,
                hour: invites[hour],
                time: hour,
                events: invites[hour],
              })
            }),
          ]),
        ])
      )
    },
  }
}
