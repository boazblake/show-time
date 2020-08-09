export const Sidebar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(".sidebar-page", [
        m("ul.sidebar", [
          m(
            "li.sidebar-link",
            m(
              m.route.Link,
              {
                // onclick: (e) => logout,
                href: `/${mdl.User.name}/${M(mdl.selectedDate()).format(
                  "YYYY-MM-DD"
                )}`,
              },
              "Home"
            )
          ),

          m(
            "li.sidebar-link",
            m(
              m.route.Link,
              {
                // onclick: (e) => logout,
                href: `/profile/${mdl.User.name}`,
              },
              "Profile"
            )
          ),

          m(
            "li.sidebar-link",
            m(
              m.route.Link,
              {
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
