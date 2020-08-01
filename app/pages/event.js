export const Event = ({ attrs: { mdl } }) => {
  console.log(mdl)
  return {
    view: () =>
      m(".event-container", [
        m(
          "button",
          { onclick: (e) => m.route.set(`/${mdl.Event.date}`) },
          "Back"
        ),
        m("h1", mdl.Event.title),
        m("label", "is All Day? ", mdl.Event.allday ? "yes" : "No"),
        m("label", "date: ", mdl.Event.date),
        m("label", "begins: ", mdl.Event.startTime),
        m("label", "ends: ", mdl.Event.endTime),
        m("label", "notes: ", mdl.Event.notes),
      ]),
  }
}
