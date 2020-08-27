import { propEq } from "ramda"

export const EventInfo = ({ attrs: { setupMap, otherGuests } }) => {
  return {
    view: ({ attrs: { mdl, data, state } }) =>
      m(".event-info", [
        m("h3.heading", `Hosted by: ${data.event.hostId.name}`),
        m("h3.heading", `Notes: ${data.event.notes}`),
        m("h3.heading", `Location:`),
        m(".events-map-container", {
          style: { width: "100%", height: "250px" },
          oncreate: setupMap,
        }),

        m(
          "h3.heading",
          `Guests: Invited ${otherGuests(data.guests).length} , Accepted  ${
            otherGuests(data.guests).filter(propEq("status", 1)).length
          } , Total: ${data.guests.length}`
        ),
        m(
          "h3.heading",
          `Items: Total ${data.items.length}, selected: ${
            data.items.filter(propEq("guestId")).length
          }`
        ),

        m(
          "button.required-field",
          { onclick: (e) => state.modal.isShowing("settings") },
          "Event Settings"
        ),
      ]),
  }
}
