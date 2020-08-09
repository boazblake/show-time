export const EventToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        "button.col-xs-1-1",
        {
          onclick: (e) => {
            localStorage.removeItem("shindigit-eventId")
            mdl.State.toAnchor(mdl.Events.currentEventStart().format("HH"))
            m.route.set(
              `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
            )
          },
        },
        "Back"
      ),
    ],
  }
}
