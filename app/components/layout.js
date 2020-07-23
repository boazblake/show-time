import { Animate, slideInLeft, slideOutRight } from "Styles"
import { Header, SideBar } from "Components"
import { animate } from "Styles"
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
            oncreate: Animate(slideInLeft),
            onbeforeremove: Animate(slideOutRight),
            mdl,
          }),
      ]),
  }
}
