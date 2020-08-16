import { Profile, SidebarRSVP } from "Components"

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
            ".sidebar-tab-section",

            m(".frow row ", [
              m(
                "button.sidebar-tab.col-xs-1-3",
                {
                  class: state.Invites.isShowing()
                    ? "sidebar-tab-selected"
                    : "",
                  onclick: (e) => showState("Invites"),
                },
                "New Invites"
              ),
              m(
                "button.sidebar-tab.col-xs-1-3",
                {
                  class: state.Profile.isShowing()
                    ? "sidebar-tab-selected"
                    : "",
                  onclick: (e) => showState("Profile"),
                },
                "Profile"
              ),

              m(
                ".required-field",
                m(
                  m.route.Link,
                  {
                    id: "scale-me",
                    href: `/logout`,
                    selector: "button.sidebar-tab",
                    class: "col-xs-1-3",
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
