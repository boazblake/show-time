import { Header, SideBar } from "components"
import { animateCSS } from "styles/animations"
import { NoPause, Pause } from "Utils"

export const Layout = () => {
  return {
    view: ({ attrs: { mdl }, children }) =>
      m(".app", [
        m(Header, { mdl }),
        children,
        mdl.status.sidebar &&
          mdl.settings.profile !== "desktop" &&
          m(SideBar, {
            oncreate: animateCSS(["slideInRight", NoPause]),
            onbeforeremove: animateCSS(["slideOutRight", NoPause]),
            mdl,
          }),
      ]),
  }
}
