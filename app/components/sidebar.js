import { Profile, SidebarRSVP } from "Components"
import { getTheme } from "Utils"

export const Sidebar = () => {
  const state = {
    load: {
      error: Stream(null),
      isShowing: Stream(false),
      status: Stream("loading"),
    },
    Invites: {
      isShowing: Stream(true),
      status: Stream("loading"),
      data: Stream([]),
    },
    Profile: {
      isShowing: Stream(false),
      is24Hrs: Stream(false),
    },
  }

  const showState = (field) => {
    let keys = Object.keys(state)
    return keys.map((k) =>
      k == field ? state[k].isShowing(true) : state[k].isShowing(false)
    )
  }

  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".sidebar-page",

        [
          m(
            `.navbar-tab-section-${getTheme(mdl)}`,

            m(".frow row ", [
              m(
                `button.navbar-tab-${getTheme(mdl)}.col-xs-1-3`,
                {
                  class: state.Invites.isShowing() ? `navbar-tab-selected` : "",
                  onclick: (e) => showState("Invites"),
                },
                "New Invites"
              ),
              m(
                `button.navbar-tab-${getTheme(mdl)}.col-xs-1-3`,
                {
                  class: state.Profile.isShowing() ? `navbar-tab-selected` : "",
                  onclick: (e) => showState("Profile"),
                },
                "Profile"
              ),

              m(
                `button.navbar-tab-${getTheme(mdl)}.col-xs-1-3`,
                m(
                  m.route.Link,
                  {
                    id: "scale-me",
                    href: `/logout`,
                    class: "required-field",
                  },
                  "Logout"
                )
              ),
            ])
          ),

          state.Invites.isShowing() &&
            m(".sidebar-section", [
              m(".frow column-center height-100", [
                m(".sidebar-article frow height-100", m(SidebarRSVP, { mdl })),
              ]),
            ]),

          state.Profile.isShowing() &&
            m(
              ".sidebar-section",
              m(".frow column-center", [
                m(".sidebar-article", m(Profile, { mdl })),
              ])
            ),
        ]
      )
    },
  }
}
