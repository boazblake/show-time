import { propEq, prop } from "ramda"

export const EventInfo = ({ attrs: { data, setupMap, otherGuests } }) => {
  return {
    view: ({ attrs: { data, state } }) =>
      m(
        ".event-info",
        m(".frow column-start height-100 justify-evenly", [
          m("h3.heading", `Hosted by: ${data.event.hostId.name}`),
          m("h3.heading", `Notes: ${data.event.notes}`),
          m(".events-map-container", {
            style: { width: "100%", height: "250px" },
            oncreate: setupMap,
          }),
          m("label", `${data.event.location}`),

          m(
            "h3.heading",
            `Guests: Invited ${otherGuests(data.guests).length} , Accepted  ${
              otherGuests(data.guests).filter(propEq("status", 1)).length
            } , Total: ${data.guests.length}`
          ),
          m(
            "h3.heading",
            `Items: Total ${data.items.length}, selected: ${
              data.items.filter(prop("guestId")).length
            }`
          ),

          m(
            "button.required-field",
            { onclick: (e) => state.modal.isShowing("settings") },
            "Event Settings"
          ),
        ])
      ),
  }
}
