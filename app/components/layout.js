import { HomeToolbar, EventToolbar, Sidebar } from "Components"
import { BellLine, BarsLine, CloseLine } from "@mithril-icons/clarity/cjs"

const Header = () => {
  const getRoute = (mdl) => mdl.State.route.id

  return {
    view: ({ attrs: { mdl } }) =>
      m(".col-xs-4-5.frow row row-start", [
        getRoute(mdl) == "day-planner" && m(HomeToolbar, { mdl }),
        getRoute(mdl) == "event" && m(EventToolbar, { mdl }),
      ]),
  }
}

const calcNotifs = (mdl) =>
  Object.values(mdl.State.notifications()).reduce((acc, n) => {
    acc += n.length
    return acc
  }, 0)

const Hamburger = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return [
        m(
          "button.col-xs-1-5.button-none.frow",
          {
            onclick: (e) => mdl.Sidebar.isShowing(!mdl.Sidebar.isShowing()),
          },
          mdl.Sidebar.isShowing()
            ? m(CloseLine)
            : [
                Object.values(mdl.State.notifications()).map((v) => {
                  return (
                    v.any() && [m(".notif-count", calcNotifs(mdl)), m(BellLine)]
                  )
                }),
                m(BarsLine),
              ]
        ),
      ]
    },
  }
}

export const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".lt-grid-container", [
        m(
          ".lt-header.navbar",
          m(".frow row", [m(Header, { mdl }), m(Hamburger, { mdl })])
        ),
        mdl.Sidebar.isShowing() ? m(Sidebar, { mdl }) : m(".lt-body", children),
        m(".lt-footer", "FOOTER"),
      ]),
  }
}
