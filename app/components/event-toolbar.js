import { hyphenize } from "Utils"

export const EventToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        "button.btn.col-xs-1-1",
        {
          onclick: (e) => {
            localStorage.removeItem("shindigit-eventId")
            mdl.State.toAnchor(M(mdl.Events.currentEventStart()).format("HH"))
            m.route.set(
              `/${hyphenize(mdl.User.name)}/${M(
                mdl.Events.currentEventStart()
              ).format("YYYY-MM-DD")}`
            )
          },
        },
        "Back"
      ),
    ],
  }
}
