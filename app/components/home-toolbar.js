import { hyphenize } from "Utils"

export const HomeToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m("input.col-xs-1-2", {
        onchange: (e) =>
          m.route.set(
            `/${hyphenize(mdl.User.name)}/${mdl
              .selectedDate()
              .format("YYYY-MM-DD")}`
          ),
        type: "date",
        value: mdl.selectedDate().format("YYYY-MM-DD"),
      }),
      m(
        m.route.Link,
        {
          class: "col-xs-1-2",
          selector: "button",
          href: `/${hyphenize(mdl.User.name)}/${M().format("YYYY-MM-DD")}`,
        },
        "Today"
      ),
    ],
  }
}
