import { Header, SideBar } from "components"
import { animateCSS } from "styles/animations"

export const Layout = () => {
  return {
    view: ({ attrs: { mdl }, children }) =>
      m(".app", [
        m(Header, { mdl }),
        children,
        mdl.status.sidebar &&
          mdl.settings.profile !== "desktop" &&
          m(SideBar, {
            oncreate: animateCSS("slideInRight"),
            onbeforeremove: animateCSS("slideOutRight"),
            mdl,
          }),
      ]),
  }
}
