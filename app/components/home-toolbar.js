export const HomeToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".toolbar", [
        m("input.cal-toolbar-input", {
          onchange: (e) =>
            m.route.set(
              `/${mdl.User.name}/${mdl.selectedDate().format("YYYY-MM-DD")}`
            ),
          type: "date",
          value: mdl.selectedDate().format("YYYY-MM-DD"),
        }),
        m(
          m.route.Link,
          {
            selector: "button",
            class: "cal-toolbar-input",
            href: `/${mdl.User.name}/${M.utc().format("YYYY-MM-DD")}`,
          },
          "Today"
        ),
        m(
          m.route.Link,
          {
            selector: "button",
            class: "cal-toolbar-input",
            // onclick: (e) => logout,
            href: `/logout`,
          },
          "Logout"
        ),
      ]),
  }
}
