export const HomeToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m("input.col-xs-1-2", {
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
          class: "col-xs-1-2",
          selector: "button",
          href: `/${mdl.User.name}/${M.utc().format("YYYY-MM-DD")}`,
        },
        "Today"
      ),
    ],
  }
}
