import { AnimateNavBar } from "styles/animations"
import { Hamburger } from "components"
import { nameFromRoute, Pause, randomPause, NoPause } from "Utils"

export const Header = {
  view: ({ attrs: { mdl } }) =>
    m("#header.frow.row-center.justify-between", [
      m(
        "code",
        m(
          "p.typewriter type-writer",
          {
            id: "logo-header",
            // oncreate: ({ dom }) =>
            //   (dom.onanimationend = () =>
            //     setTimeout(
            //       () => dom.classList.remove("type-writer"),
            //       Pause(2)
            //     )),
          },
          "{Boaz Blake}"
        )
      ),
      mdl.settings.profile === "desktop"
        ? m(
            ".navbar.frow",
            {
              // oncreate: AnimateNavBar(["slideInDown", NoPause, randomPause])
            },
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
