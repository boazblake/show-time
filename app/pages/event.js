const gotoroute = (mdl) => m.route.set(`/${mdl.Event.date}`)

const deleteEvent = (mdl) => {
  let { date, hour, min } = m.route.param()
  delete mdl.Day.data[`${hour}:00`][min]
  localStorage.setItem(date, JSON.stringify(mdl.Day.data))
  m.redraw()
  gotoroute(mdl)
}

export const Event = ({ attrs: { mdl } }) => {
  console.log(mdl)
  return {
    view: () =>
      m(".event-container", [
        m(
          "button",
          {
            onclick: (e) => {
              mdl.toAnchor(mdl.Event.startTime)
              gotoroute(mdl)
            },
          },
          "Back"
        ),
        m("h1", mdl.Event.title),
        m("label", "is All Day? ", mdl.Event.allday ? "yes" : "No"),
        m("label", "date: ", mdl.Event.date),
        m("label", "begins: ", mdl.Event.startTime),
        m("label", "ends: ", mdl.Event.endTime),
        m("label", "notes: ", mdl.Event.notes),
        m("button", { onclick: (e) => deleteEvent(mdl) }, "delete"),
      ]),
  }
}
