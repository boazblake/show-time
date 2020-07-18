export const Hamburger = {
  view: ({ attrs: { mdl } }) =>
    m(
      "button[type='button'].hamburger.hamburger--emphatic.js-hamburger",
      {
        class: mdl.status.sidebar ? "is-active" : "",
        onclick: (e) => (mdl.status.sidebar = !mdl.status.sidebar),
      },
      m("span.hamburger-box", m("span.hamburger-inner"))
    ),
}
