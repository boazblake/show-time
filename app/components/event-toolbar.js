import { hyphenize, getTheme } from "Utils"

export const EventToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        `button.col-xs-1-1.btn-${getTheme(mdl)}`,
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
