import { HomeToolbar, EventToolbar } from "Components"

const Header = () => {
  const getRoute = (mdl) => {
    // console.log("route", mdl)
    return mdl.State.route.id
  }
  return {
    view: ({ attrs: { mdl } }) => [
      getRoute(mdl) == "day-planner" && m(HomeToolbar, { mdl }),
      getRoute(mdl) == "event" && m(EventToolbar, { mdl }),
    ],
  }
}

export const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".lt-grid-container", [
        m(".lt-header.frow row", [
          m(".col-xs-2-3", m(Header, { mdl })),
          m(".col-xs-1-3", "X"),
        ]),
        m(".lt-body", children),
        m(".lt-footer", "FOOTER"),
      ]),
  }
}
