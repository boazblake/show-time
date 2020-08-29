import { hyphenize, getTheme } from "Utils"

export const HomeToolbar = ({ attrs: { mdl } }) => {
  const updateDate = (date) =>
    m.route.set(`/${hyphenize(mdl.User.name)}/${M(date).format("YYYY-MM-DD")}`)

  const getValue = (date) => M(date).format("YYYY-MM-DD")

  return {
    view: ({ attrs: { mdl } }) => [
      m("input.col-xs-1-2", {
        onchange: (e) => updateDate(e.target.value),
        type: "date",
        value: getValue(mdl.selectedDate()),
      }),
      m(
        m.route.Link,
        {
          disabled: mdl.Sidebar.isShowing(),
          class: "col-xs-1-2",
          selector: `button.btn-${getTheme(mdl)}`,
          href: `/${hyphenize(mdl.User.name)}/${M().format("YYYY-MM-DD")}`,
        },
        "Today"
      ),
    ],
  }
}
