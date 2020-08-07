import { getHour } from "Utils"

export const EventToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "button",
        {
          onclick: (e) => {
            mdl.State.toAnchor(mdl.Events.currentEventStartTime().format("HH"))
            m.route.set(
              `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
            )
          },
        },
        "Back"
      ),
  }
}
