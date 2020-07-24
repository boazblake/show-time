import { AnimateChildren, sideBarChildren, slideOutLeft } from "Styles"
import { nameFromRoute, randomPause } from "Utils"

export const SideBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ul.sidebar",
        {
          oncreate: AnimateChildren(sideBarChildren(), randomPause),
          onbeforeremove: AnimateChildren(slideOutLeft),
        },
        mdl.routes
          .filter((r) => r !== m.route.get())
          .map((route) =>
            m(
              m.route.Link,
              {
                class: "sidebar-item",
                href: route,
                selector: "li",
              },
              nameFromRoute(route)
            )
          )
      ),
  }
}
