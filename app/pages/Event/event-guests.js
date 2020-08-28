import { InviteRSVP } from "Components"
import { getTheme } from "Utils"
import { propEq, compose, not, head } from "ramda"
export const EventGuests = ({ attrs: { sendInvite } }) => {
  return {
    view: ({ attrs: { mdl, data, state } }) =>
      m(
        ".event-guests",
        m(".guests-container", [
          m(
            ".event-forms",
            m(".frow row event-input-group", [
              m("input.col-xs-4-5 pb-20", {
                placeholder: "email",
                type: "email",
                value: state.guests.email,
                oninput: (e) => (state.guests.email = e.target.value.trim()),
              }),

              m(
                `button.btn-${getTheme(mdl)}.col-xs-1-5.button-none`,
                { onclick: (e) => sendInvite(mdl) },
                "Invite"
              ),

              state.guests.error() &&
                m("code.error-field", state.guests.error()),
            ])
          ),

          m(".frow row-start mb-20 pl-5", [
            m(".col-xs-1-2", mdl.User.name),
            m(
              ".col-xs-1-2",
              m(InviteRSVP, {
                mdl,
                reload: () => mdl.Invites.fetch(true),
                guest: head(
                  data.guests.filter(propEq("guestId", mdl.User.objectId))
                ),
              })
            ),
          ]),
          m("hr"),
          data.guests
            .filter(compose(not, propEq("guestId", mdl.User.objectId)))
            .map((guest) =>
              m(".frow row-start mb-20 pl-5", [
                m(".col-xs-1-2", guest.name),
                m(
                  ".col-xs-1-2",
                  m(InviteRSVP, {
                    mdl,
                    guest,
                    isOther: true,
                  })
                ),
              ])
            ),
        ])
      ),
  }
}
