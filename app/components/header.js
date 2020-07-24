import { AnimateChildren, slideInDown } from "Styles"
import { Hamburger } from "Components"
import { nameFromRoute, randomPause, isSideBarActive } from "Utils"

export const Header = {
  view: ({ attrs: { mdl } }) =>
    m(
      "#header.frow.row-center.justify-between",
      {
        style: {
          backgroundColor: isSideBarActive(mdl) ? "black" : "white",
          color: isSideBarActive(mdl) ? "white" : "black",
        },
      },
      [
        m(
          "code",
          m(
            "p.typewriter type-writer",
            {
              id: "logo-header",
              oncreate: ({ dom }) =>
                (dom.onanimationend = () =>
                  setTimeout(() => dom.classList.remove("type-writer"))),
            },
            "{Boaz Blake}"
          )
        ),
        mdl.settings.profile === "desktop"
          ? m(
              ".navbar.frow",
              {
                oncreate: AnimateChildren(slideInDown, randomPause),
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
      ]
    ),
}
