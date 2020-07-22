import { AnimateNavBar, animateCSS } from "styles/animations"
import { Hamburger } from "components"
import { nameFromRoute } from "Utils"

export const Header = {
  view: ({ attrs: { mdl } }) =>
    m("#header", [
      m(
        "code",
        m(
          "p.typewriter type-writer",
          {
            oncreate: ({ dom }) =>
              (dom.onanimationend = () =>
                setTimeout(() => dom.classList.remove("type-writer"), 2000)),
          },
          "{Boaz Blake}"
        )
      ),
      mdl.settings.profile === "desktop"
        ? m(
            ".navbar",
            { oncreate: AnimateNavBar("slideInDown") },
            mdl.routes
              .filter((r) => r !== m.route.get())
              .map((route) =>
                m(
                  m.route.Link,
                  {
                    class: "navbar-item",
                    href: route,
                    selector: "li",
                  },
                  nameFromRoute(route)
                )
              )
          )
        : m(Hamburger, { mdl }),
    ]),
}
