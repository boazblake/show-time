import { Profile, AttendanceResponse, Logo } from "Components"
import { getTimeFormat } from "Utils"

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
      return m(".sidebar-page", [
        m(
          ".sidebar-tab-section",
          m(".frow row ", [
            m(
              "button.sidebar-tab.col-xs-1-3",
              {
                class: state.Invites.isShowing() ? "sidebar-tab-selected" : "",
                onclick: (e) => showState("Invites"),
              },
              "New Invites"
            ),
            m(
              "button.sidebar-tab.col-xs-1-3",
              {
                class: state.Profile.isShowing() ? "sidebar-tab-selected" : "",
                onclick: (e) => showState("Profile"),
              },
              "Profile"
            ),

            m(
              ".required-field",
              m(
                m.route.Link,
                {
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
              m(".sidebar-article frow height-100", [
                mdl.Invites.needRSVP().length
                  ? mdl.Invites.needRSVP().map((invite, idx) => {
                      return m(
                        ".sidebar-invites",
                        m(".frow mb-10", [
                          m(".col-xs-1-2 text-ellipsis", `${invite.title}`),
                          m(
                            ".col-xs-1-2",
                            `On: ${invite.start.format("MM-DD-YYYY")}`
                          ),
                          m(
                            ".col-xs-1-2",
                            `From: ${invite.start.format(getTimeFormat(mdl))}`
                          ),
                          m(
                            ".col-xs-1-2",
                            `To: ${invite.end.format(getTimeFormat(mdl))}`
                          ),
                        ]),
                        m(AttendanceResponse, {
                          mdl,
                          updateFn: (x) => {
                            console.log("remove x from ...", x)
                          },
                          guest: invite,
                        })
                      )
                    })
                  : m(".logo-placeholder", [
                      m("h3", "You have no outstanding invites"),
                      Logo,
                    ]),
              ]),
            ]),
          ]),
        state.Profile.isShowing() &&
          m(
            ".sidebar-section",
            m(".frow column-center", [
              m(".sidebar-article", m(Profile, { mdl })),
            ])
          ),
      ])
    },
  }
}
