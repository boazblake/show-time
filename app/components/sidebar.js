import { AnimateSideBar } from "styles/animations"

export const SideBar = () => {
  let routeName = (route) => route.split("/")[1].toUpperCase()
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
                href: route,
                selector: "li",
              },
              routeName(route)
            )
          )
      ),
  }
}
