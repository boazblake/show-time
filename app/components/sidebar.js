export const Sidebar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      console.log("sidebar", mdl.selectedDate())
      return m(".sidebar", [
        m("ul", [
          m(
            "li",
            m(
              m.route.Link,
              {
                selector: "button",
                class: "col-xs-1-3",
                // onclick: (e) => logout,
                href: `/${mdl.User.name}/${M(mdl.selectedDate()).format(
                  "YYYY-MM-DD"
                )}`,
              },
              "Home"
            )
          ),

          m(
            "li",
            m(
              m.route.Link,
              {
                selector: "button",
                class: "col-xs-1-3",
                // onclick: (e) => logout,
                href: `/profile/${mdl.User.name}`,
              },
              "Profile"
            )
          ),

          m(
            "li",
            m(
              m.route.Link,
              {
                selector: "button",
                class: "col-xs-1-3",
                // onclick: (e) => logout,
                href: `/logout`,
              },
              "Logout"
            )
          ),
        ]),
      ])
    },
  }
}
