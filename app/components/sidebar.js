import { AnimateSideBar } from "styles/animations"
import { nameFromRoute } from "Utils"
export const SideBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ul.sidebar",
        { oncreate: AnimateSideBar("slideInLeft") },
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
