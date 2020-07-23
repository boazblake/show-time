import { AnimateSideBarIn, AnimateSideBarOut } from "styles/animations"
import { nameFromRoute, Pause, randomPause, NoPause } from "Utils"
export const SideBar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ul.sidebar",
        {
          // oncreate: AnimateSideBarIn(["slideInLeft", NoPause, randomPause]),
          // onbeforeremove: AnimateSideBarOut([
          //   "slideOutLeft",
          //   Pause(2),
          //   Pause(1),
          // ]),
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
