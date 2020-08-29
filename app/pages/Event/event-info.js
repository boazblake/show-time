import { propEq, prop } from "ramda"

export const EventInfo = ({ attrs: { setupMap, otherGuests } }) => {
  const invitedGuests = (guests) => otherGuests(guests).length
  const acceptedGuests = (guests) =>
    otherGuests(guests).filter(propEq("status", 1)).length
  const itemsSelected = (items) => items.filter(prop("guestId")).length

  return {
    view: ({ attrs: { data, state } }) =>
      m(
        ".event-info",
        m(".frow column-start height-100 justify-evenly", [
          m("h3.heading", `Hosted by: ${data.event.hostId.name}`),
          m(".events-map-container", {
            style: { width: "100%", height: "250px" },
            oncreate: setupMap,
            onupdate: setupMap,
          }),
          m("label", `${data.event.location}`),

          m(
            "h3.heading",
            `Guests: Invited ${invitedGuests(
              data.guests
            )} , Accepted  ${acceptedGuests(data.guests)} , Total: ${
              data.guests.length
            }`
          ),
          m(
            "h3.heading",
            `Items: Total ${data.items.length}, selected: ${itemsSelected(
              data.items
            )}`
          ),
          m("h3.heading", `Notes: ${data.event.notes}`),

          m(
            "button.required-field",
            { onclick: (e) => state.modal.isShowing("settings") },
            "Event Settings"
          ),
        ])
      ),
  }
}
