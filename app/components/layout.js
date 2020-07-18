import { Hamburger, SideBar } from "components"
import { animateCSS } from "styles/animations"

const Header = {
  view: ({ attrs: { mdl } }) => m(".header", m(Hamburger, { mdl })),
}

export const Layout = () => {
  return {
    view: ({ attrs: { mdl }, children }) =>
      m(".", [
        m(Header, { mdl }),
        children,
        mdl.status.sidebar &&
          m(SideBar, {
            oncreate: animateCSS("slideInRight"),
            mdl,
          }),
      ]),
  }
}
