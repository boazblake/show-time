export const Hamburger = {
  view: ({ attrs: { mdl } }) =>
    m(
      "div.nav-icon",
      {
        class: mdl.status.sidebar ? "is-active" : "",
        onclick: (e) => (mdl.status.sidebar = !mdl.status.sidebar),
      },
      m("div")
    ),
}
