import { HomeToolbar, EventToolbar, Sidebar } from "Components"

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

const Hamburger = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "button.col-xs-1-5",
        {
          onclick: (e) => mdl.Sidebar.isShowing(!mdl.Sidebar.isShowing()),
        },
        mdl.Sidebar.isShowing() ? "Close" : "Menu"
      ),
  }
}

export const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".lt-grid-container", [
        m(".lt-header.frow row", [m(Header, { mdl }), m(Hamburger, { mdl })]),
        mdl.Sidebar.isShowing() ? m(Sidebar, { mdl }) : m(".lt-body", children),
        m(".lt-footer", "FOOTER"),
      ]),
  }
}
